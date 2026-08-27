import { useLocation } from "react-router-dom";
import Navbar from "../components/Navbar";
import ProductCard from "../components/ProductCard";
import { products } from "./Home";

function Products() {
  const location = useLocation();

  const params = new URLSearchParams(location.search);
  const search = params.get("search") || "";

  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <>
      <Navbar />

      <section className="section">
        <h2>
          Search Results for "{search}"
        </h2>

        {filteredProducts.length === 0 ? (
          <h3>No products found 😔</h3>
        ) : (
          <div className="products">
            {filteredProducts.map((item) => (
              <ProductCard
                key={item.id}
                product={item}
              />
            ))}
          </div>
        )}
      </section>
    </>
  );
}

export default Products;