import { useState } from "react";
import "./App.css";
import { Link, Route, Routes } from "react-router-dom";
import { useNavigate } from "react-router-dom";


import Home from "./pages/Home";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import Product from "./pages/Product";
import TrackOrder from "./pages/TrackOrder";
// import Products from "./pages/Products";
function App() {
  return (
    <div>


    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/cart" element={<Cart />} />
      <Route path="/checkout" element={<Checkout />} />
      <Route path="/product/:id" element={<Product />} />
      <Route path="/trackOrder" element={<TrackOrder />} />
      {/* <Route path="/products" element={<Products />} /> */}
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