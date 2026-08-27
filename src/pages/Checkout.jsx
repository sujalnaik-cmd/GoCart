import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import { useAuth } from "../context/AuthContext";
import { useCart } from "../context/CartContext";

function Checkout() {
  const [address, setAddress] = useState("");
  const [error, setError] = useState("");
  const [placing, setPlacing] = useState(false);
  const { createOrder } = useAuth();
  const { items, total, clearCart } = useCart();
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError("");
    setPlacing(true);
    try {
      await createOrder({ address, items, total });
      clearCart();
      navigate("/orders");
    } catch (requestError) {
      setError(requestError.message);
    } finally {
      setPlacing(false);
    }
  };

  if (items.length === 0) {
    return <><Navbar /><div className="section"><h1>Your cart is empty</h1><p className="muted">Add products before checking out.</p><button type="button" onClick={() => navigate("/")}>Browse products</button></div></>;
  }

  return (
    <>
      <Navbar />

      <form className="section checkout-form" onSubmit={handleSubmit}>
        <h1>💳 Checkout</h1>

        {items.map((item) => <p key={item.id}>{item.name} × {item.quantity} <strong>₹{item.price * item.quantity}</strong></p>)}
        <h2>Total: ₹{total}</h2>
        <input required value={address} onChange={(event) => setAddress(event.target.value)} placeholder="Enter Delivery Address" />

        <br />
        <br />

        {error && <p className="form-error">{error}</p>}
        <button type="submit" disabled={placing}>{placing ? "Placing order..." : "Place Order"}</button>
      </form>
    </>
  );
}

export default Checkout;