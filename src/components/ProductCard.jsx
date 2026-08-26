function ProductCard({ product }) {
  return (
    <div className="product-card">
      <div className="product-image">{product.image}</div>

      <h3>{product.name}</h3>
      <p>{product.qty}</p>

      <strong>₹{product.price}</strong>

      <button>Add +</button>
    </div>
  );
}

export default ProductCard;