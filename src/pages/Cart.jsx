import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";

function Cart() {
  return (
    <>
      <Navbar />

      <div className="section">
        <h1>🛒 My Cart</h1>

        <p>Fresh Milk × 1</p>

        <h2>Total: ₹30</h2>

        <Link to="/checkout">
          <button>Proceed to Checkout</button>
        </Link>
      </div>
    </>
  );
}

export default Cart;