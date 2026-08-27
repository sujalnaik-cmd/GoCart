import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";

function Checkout() {
  return (
    <>
      <Navbar />

      <div className="section">
        <h1>💳 Checkout</h1>

        <input placeholder="Enter Delivery Address" />

        <br />
        <br />

        <Link to="/trackOrder">
          <button>Place Order</button>
        </Link>
      </div>
    </>
  );
}

export default Checkout;