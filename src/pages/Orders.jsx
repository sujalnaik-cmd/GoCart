import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import { useAuth } from "../context/AuthContext";

function Orders() {
  const { getOrders } = useAuth();
  const [orders, setOrders] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    getOrders().then(({ orders: currentOrders }) => setOrders(currentOrders)).catch((requestError) => setError(requestError.message));
  }, [getOrders]);

  return <>
    <Navbar />
    <section className="section orders-page">
      <p className="eyebrow">Your account</p>
      <h1>Order history</h1>
      {error && <p className="form-error">{error}</p>}
      {!error && orders.length === 0 && <p className="muted">Your placed orders will appear here.</p>}
      <div className="orders-list">
        {orders.map((order) => <article className="order-card" key={order._id}>
          <div className="order-heading"><strong>Order #{order._id.slice(-6).toUpperCase()}</strong><span>{order.status}</span></div>
          <p className="muted">{new Date(order.createdAt).toLocaleDateString()} · Deliver to {order.address}</p>
          {order.items.map((item) => <p key={item.name}>{item.name} × {item.quantity} <strong>₹{item.price * item.quantity}</strong></p>)}
          <h3>Total ₹{order.total}</h3>
        </article>)}
      </div>
    </section>
  </>;
}

export default Orders;
