import { Link } from "react-router-dom";

function ProductCard({ product }) {
  return (
    <Link to={`/product/${product.id}`} style={{ textDecoration: "none", color: "inherit" }}>
    <div className="product-card">
      <div className="product-image">{product.image}</div>

      <h3>{product.name}</h3>
      <p>{product.qty}</p>

      <strong>₹{product.price}</strong>

      <button>Add +</button>
    </div>
    </Link>
  );
}

export default ProductCard;