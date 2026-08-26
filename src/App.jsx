import { useState } from "react";
import "./App.css";

function App() {
  const categories = [
    { icon: "🥦", name: "Groceries" },
    { icon: "🍿", name: "Snacks" },
    { icon: "🥤", name: "Drinks" },
    { icon: "📱", name: "Electronics" },
    { icon: "🧴", name: "Personal Care" },
  ];

  const products = [
    { emoji: "🥛", name: "Fresh Milk", qty: "1 L", price: 55, old: 70, rating: 4.8 },
    { emoji: "🍞", name: "Brown Bread", qty: "400 g", price: 40, old: 50, rating: 4.6 },
    { emoji: "🍎", name: "Fresh Apple", qty: "1 kg", price: 149, old: 189, rating: 4.9 },
    { emoji: "🥚", name: "Farm Eggs", qty: "12 pcs", price: 95, old: 120, rating: 4.7 },
  ];

  const [search, setSearch] = useState("");
  const [query, setQuery] = useState("");

  const filteredProducts = products.filter((item) =>
    item.name.toLowerCase().includes(query.toLowerCase())
  );

  const handleSearch = () => {
    setQuery(search);
  };

  return (
    <div className="app">

      {/* NAVBAR */}
      <nav className="navbar">
        <div className="logo">🛒 GoCart</div>

        <div className="location">📍 Deliver to Goa</div>

        <div className="nav-links">
          <span>Login</span>
          <span>Orders</span>

          <span className="cart-icon">
            🛒 Cart
            <span className="badge">2</span>
          </span>
        </div>
      </nav>

      {/* HERO */}
      <section className="hero">
        <h1>Everything you need, delivered fast.</h1>
        <p>Shop local products and get them delivered to your doorstep.</p>

        <div className="search-box">
          <input
            type="text"
            placeholder="Search for products..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") handleSearch();
            }}
          />

          <button onClick={handleSearch}>Search</button>
        </div>
      </section>

      {/* OFFERS */}
      <section className="offers">
        <div className="offer-card red">
          <h3>🔥 20% OFF</h3>
          <p>On your first order</p>
        </div>

        <div className="offer-card blue">
          <h3>⚡ Free Home Delivery</h3>
          <p>Above ₹299</p>
        </div>

        <div className="offer-card green">
          <h3>🎁 Buy 1 Get 1</h3>
          <p>Selected snacks today</p>
        </div>
      </section>

      {/* CATEGORIES */}
      <section className="section">
        <h2>Shop by Category</h2>

        <div className="categories">
          {categories.map((cat) => (
            <div className="category" key={cat.name}>
              <div>{cat.icon}</div>
              <span>{cat.name}</span>
            </div>
          ))}
        </div>
      </section>

      {/* PRODUCTS */}
      <section className="section">
        <h2>Popular Near You</h2>

        {filteredProducts.length === 0 ? (
          <h3 style={{ textAlign: "center", marginTop: "30px" }}>
            No products found 😔
          </h3>
        ) : (
          <div className="products">
            {filteredProducts.map((item) => (
              <div className="product-card" key={item.name}>
                <span className="discount">20% OFF</span>

                <div className="product-image">{item.emoji}</div>

                <h3>{item.name}</h3>

                <p>
                  {item.qty} • ⭐ {item.rating}
                </p>

                <div className="price-row">
                  <strong>₹{item.price}</strong>
                  <span className="old-price">₹{item.old}</span>
                </div>

                <button>Add +</button>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* FEATURES */}
      <section className="section">
        <h2>Why Choose GoCart?</h2>

        <div className="features">
          <div className="feature">
            <div>🚚</div>
            <h3>10 Minute Delivery</h3>
            <p>Lightning fast delivery across Goa.</p>
          </div>

          <div className="feature">
            <div>🥬</div>
            <h3>Fresh Products</h3>
            <p>Daily stocked groceries & vegetables.</p>
          </div>

          <div className="feature">
            <div>💳</div>
            <h3>Secure Payments</h3>
            <p>UPI, Cards & Cash on Delivery.</p>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="footer">
        <h2>GoCart</h2>

        <p>Fast • Fresh • Affordable</p>

        <div className="footer-links">
          <span>About</span>
          <span>Contact</span>
          <span>Privacy</span>
          <span>Careers</span>
        </div>

        <small>© 2026 GoCart. All rights reserved.</small>
      </footer>

    </div>
  );
}

export default App;