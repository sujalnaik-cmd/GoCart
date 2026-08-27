import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import { useCart } from "../context/CartContext";

function Cart() {
  const { items, total, setQuantity, removeItem } = useCart();

  return (
    <>
      <Navbar />

      <div className="section">
        <h1>🛒 My Cart</h1>

        {items.length === 0 ? <>
          <p className="muted">Your cart is empty.</p>
          <Link to="/"><button type="button">Browse products</button></Link>
        </> : <>
          <div className="cart-items">
            {items.map((item) => <div className="cart-item" key={item.id}>
              <span className="cart-product-image">{item.image}</span>
              <div><strong>{item.name}</strong><p className="muted">{item.qty} · ₹{item.price}</p></div>
              <div className="quantity-controls">
                <button type="button" onClick={() => setQuantity(item.id, item.quantity - 1)}>-</button>
                <span>{item.quantity}</span>
                <button type="button" onClick={() => setQuantity(item.id, item.quantity + 1)}>+</button>
              </div>
              <strong>₹{item.price * item.quantity}</strong>
              <button type="button" className="remove-button" onClick={() => removeItem(item.id)}>Remove</button>
            </div>)}
          </div>
          <h2>Total: ₹{total}</h2>
          <Link to="/checkout"><button type="button">Proceed to Checkout</button></Link>
        </>}
      </div>
    </>
  );
}

export default Cart;