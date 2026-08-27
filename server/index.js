import "dotenv/config";
import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const app = express();
const port = process.env.PORT || 5000;
const jwtSecret = process.env.JWT_SECRET || "development-secret-change-me";

app.use(cors());
app.use(express.json());

const userSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true },
  email: { type: String, required: true, unique: true, lowercase: true, trim: true },
  password: { type: String, required: true },
}, { timestamps: true });

const orderSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  items: [{ name: String, quantity: Number, price: Number }],
  address: { type: String, required: true, trim: true },
  total: { type: Number, required: true },
  status: { type: String, default: "Order placed" },
}, { timestamps: true });

const User = mongoose.model("User", userSchema);
const Order = mongoose.model("Order", orderSchema);

function createToken(user) {
  return jwt.sign({ id: user._id }, jwtSecret, { expiresIn: "7d" });
}

function publicUser(user) {
  return { id: user._id, name: user.name, email: user.email };
}

async function requireAuth(request, response, next) {
  try {
    const token = request.headers.authorization?.replace("Bearer ", "");
    if (!token) return response.status(401).json({ message: "Please sign in first" });
    const decoded = jwt.verify(token, jwtSecret);
    request.user = await User.findById(decoded.id);
    if (!request.user) return response.status(401).json({ message: "User no longer exists" });
    next();
  } catch {
    response.status(401).json({ message: "Invalid or expired session" });
  }
}

app.post("/api/auth/register", async (request, response) => {
  try {
    const { name, email, password } = request.body;
    if (!name || !email || !password || password.length < 6) return response.status(400).json({ message: "Name, email, and a 6+ character password are required" });
    const existingUser = await User.findOne({ email });
    if (existingUser) return response.status(409).json({ message: "An account with that email already exists" });
    const user = await User.create({ name, email, password: await bcrypt.hash(password, 12) });
    response.status(201).json({ token: createToken(user), user: publicUser(user) });
  } catch {
    response.status(500).json({ message: "Unable to create account" });
  }
});

app.post("/api/auth/login", async (request, response) => {
  const { email, password } = request.body;
  const user = await User.findOne({ email });
  if (!user || !(await bcrypt.compare(password || "", user.password))) return response.status(401).json({ message: "Incorrect email or password" });
  response.json({ token: createToken(user), user: publicUser(user) });
});

app.get("/api/auth/me", requireAuth, (request, response) => response.json({ user: publicUser(request.user) }));

app.post("/api/orders", requireAuth, async (request, response) => {
  try {
    const { items, address } = request.body;
    if (!address?.trim() || !Array.isArray(items) || items.length === 0) return response.status(400).json({ message: "Address and cart items are required" });
    const validItems = items.every((item) => item.name && Number.isFinite(Number(item.price)) && Number.isInteger(Number(item.quantity)) && Number(item.quantity) > 0);
    if (!validItems) return response.status(400).json({ message: "Cart items are invalid" });
    const normalizedItems = items.map((item) => ({ name: item.name, quantity: Number(item.quantity), price: Number(item.price) }));
    const total = normalizedItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
    const order = await Order.create({ user: request.user._id, items: normalizedItems, address: address.trim(), total });
    response.status(201).json({ order });
  } catch (error) {
    console.error("Unable to place order:", error);
    response.status(500).json({ message: error.name === "ValidationError" ? "Order data is invalid" : "Unable to place order. Check the MongoDB connection." });
  }
});

app.get("/api/orders", requireAuth, async (request, response) => {
  try {
    const orders = await Order.find({ user: request.user._id }).sort({ createdAt: -1 });
    response.json({ orders });
  } catch (error) {
    console.error("Unable to load orders:", error.message);
    response.status(500).json({ message: "Unable to load orders. Check the MongoDB connection." });
  }
});

app.get("/api/health", (request, response) => response.json({ status: "ok" }));

mongoose.connect(process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/gocart")
  .then(() => app.listen(port, () => console.log(`GoCart API running on port ${port}`)))
  .catch((error) => {
    console.error("MongoDB connection failed:", error.message);
    process.exit(1);
  });
