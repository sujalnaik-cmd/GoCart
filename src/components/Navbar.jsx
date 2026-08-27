import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <nav className="navbar">
      <Link to="/" className="logo">
        🛒 GoCart
      </Link>

      <div className="location">📍 Deliver to Goa</div>

      <div className="nav-links">
        {user ? <button className="nav-button" onClick={handleLogout}>Sign out</button> : <button className="nav-button" onClick={() => navigate("/login")}>Sign in</button>}
        <Link to="/orders">Orders</Link>
        <Link to="/cart">🛒 Cart</Link>
      </div>
    </nav>
  );
}

export default Navbar;