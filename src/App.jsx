import "./App.css";
import { Navigate, Route, Routes } from "react-router-dom";


import Home from "./pages/Home";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import Product from "./pages/Product";
import TrackOrder from "./pages/TrackOrder";
import Products from "./pages/Products";
import Login from "./pages/Login";
import Orders from "./pages/Orders";
import { useAuth } from "./context/AuthContext";

function ProtectedRoute({ children }) {
  const { user, loading } = useAuth();
  if (loading) return <div className="section"><p>Loading...</p></div>;
  return user ? children : <Navigate to="/login" replace />;
}

function App() {
  return (
    <div>


    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/cart" element={<Cart />} />
      <Route path="/checkout" element={<ProtectedRoute><Checkout /></ProtectedRoute>} />
      <Route path="/product/:id" element={<Product />} />
      <Route path="/trackOrder" element={<TrackOrder />} />
      <Route path="/products" element={<Products />} />
      <Route path="/login" element={<Login />} />
      <Route path="/orders" element={<ProtectedRoute><Orders /></ProtectedRoute>} />
    </Routes>

     {/* <footer className="footer">
        <h2>GoCart</h2>

        <p>Fast • Fresh • Affordable</p>

        <div className="footer-links">
          <span>About</span>
          <span>Contact</span>
          <span>Privacy</span>
          <span>Careers</span>
        </div>

        <small>© 2026 GoCart. All rights reserved.</small>
      </footer> */}

     </div>

    
  );
}

export default App;