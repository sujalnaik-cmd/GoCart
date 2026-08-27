import { useState } from "react";
import Navbar from "../components/Navbar";
import SearchBar from "../components/SearchBar";
import ProductCard from "../components/ProductCard";
 const categories = [
    { icon: "🥦", name: "Groceries" },
    { icon: "🍿", name: "Snacks" },
    { icon: "🥤", name: "Drinks" },
    { icon: "📱", name: "Electronics" },
    { icon: "🧴", name: "Personal Care" },
  ];
const products = [
  { id: 1, image: "🥛", name: "Fresh Milk", qty: "500 ml", price: 30 },
  { id: 2, image: "🍞", name: "Bread", qty: "400 g", price: 45 },
  { id: 3, image: "🍎", name: "Apples", qty: "1 kg", price: 120 },
  { id: 4, image: "🥚", name: "Eggs", qty: "12 pcs", price: 90 },
];

export { products };

function Home() {
  const [search, setSearch] = useState("");

  // const filtered = products.filter((item) =>
  //   item.name.toLowerCase().includes(search.toLowerCase())
  // );

  return (
    <>
      <Navbar />

      <section className="hero">
        <h1>Everything you need, delivered fast.</h1>
        <p>Shop local products at lightning speed.</p>

        <SearchBar search={search} setSearch={setSearch} />
      </section>



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
          <h3>🎁 Buy 1 Get 1 Free</h3>
          <p>Selected snacks today</p>
        </div>
      </section>


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


      <section className="section">
        <h2>Popular Near You</h2>

        <div className="products">
          {products.map((item) => (


            <ProductCard key={item.id} product={item} />
          
          
          ))}
        </div>
      </section>

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
    </>
  );
}

export default Home;