import { useParams, Link } from "react-router-dom";
import Navbar from "../components/Navbar";

const products = [
  { id: 1, image: "🥛", name: "Fresh Milk", qty: "500 ml", price: 30 },
  { id: 2, image: "🍞", name: "Bread", qty: "400 g", price: 45 },
  { id: 3, image: "🍎", name: "Apples", qty: "1 kg", price: 120 },
  { id: 4, image: "🥚", name: "Eggs", qty: "12 pcs", price: 90 },
];

function Product() {
  const { id } = useParams();
  const product = products.find((p) => p.id === Number(id));

  return (
    <>
      <Navbar />

      <div className="section">
        <div className="product-image">{product.image}</div>

        <h1>{product.name}</h1>
        <p>{product.qty}</p>

        <h2>₹{product.price}</h2>

        <Link to="/cart">
          <button>Add To Cart</button>
        </Link>
      </div>
    </>
  );
}

export default Product;