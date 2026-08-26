import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav className="navbar">
      <Link to="/" className="logo">
        🛒 GoCart
      </Link>

      <div className="location">📍 Deliver to Goa</div>

      <div className="nav-links">
        <span>Login</span>
        <span>Orders</span>
        <Link to="/cart">🛒 Cart</Link>
      </div>
    </nav>
  );
}

export default Navbar;