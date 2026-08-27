import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";

function ProductCard({ product }) {
  const { addItem } = useCart();

  return (
    <Link to={`/product/${product.id}`} style={{ textDecoration: "none", color: "inherit" }}>
    <div className="product-card">
      <div className="product-image">{product.image}</div>

      <h3>{product.name}</h3>
      <p>{product.qty}</p>

      <strong>₹{product.price}</strong>

      <button type="button" onClick={(event) => { event.preventDefault(); event.stopPropagation(); addItem(product); }}>Add +</button>
    </div>
    </Link>
  );
}

export default ProductCard;