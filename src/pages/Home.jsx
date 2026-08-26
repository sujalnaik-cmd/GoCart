import { useState } from "react";
import Navbar from "../components/Navbar";
import SearchBar from "../components/SearchBar";
import ProductCard from "../components/ProductCard.";

const products = [
  { id: 1, image: "🥛", name: "Fresh Milk", qty: "500 ml", price: 30 },
  { id: 2, image: "🍞", name: "Bread", qty: "400 g", price: 45 },
  { id: 3, image: "🍎", name: "Apples", qty: "1 kg", price: 120 },
  { id: 4, image: "🥚", name: "Eggs", qty: "12 pcs", price: 90 },
];

function Home() {
  const [search, setSearch] = useState("");

  const filtered = products.filter((item) =>
    item.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <>
      <Navbar />

      <section className="hero">
        <h1>Everything you need, delivered fast.</h1>
        <p>Shop local products at lightning speed.</p>

        <SearchBar search={search} setSearch={setSearch} />
      </section>

      <section className="section">
        <h2>Popular Near You</h2>

        <div className="products">
          {filtered.map((item) => (
            <ProductCard key={item.id} product={item} />
          ))}
        </div>
      </section>
    </>
  );
}

export default Home;