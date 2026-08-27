import Navbar from "../components/Navbar";

function TrackOrder() {
  return (
    <>
      <Navbar />

      <div className="section">
        <h1>🚚 Track Order</h1>

        <h3>Order Status</h3>

        <ul>
          <li>✅ Order Placed</li>
          <li>✅ Confirmed</li>
          <li>🟡 Preparing</li>
          <li>⚪ Out for Delivery</li>
          <li>⚪ Delivered</li>
        </ul>
      </div>
    </>
  );
}

export default TrackOrder;