function ProductCard({ product, addToCart }) {
  return (
    <article className="product-card">
      <img src={product.image} alt={product.name} />
      <div className="card-body">
        <h3>{product.name}</h3>
        <p className="price">₹{product.price.toLocaleString("en-IN")}</p>
        <button className="btn" onClick={() => addToCart(product)}>
          Add to Cart
        </button>
      </div>
    </article>
  );
}

export default ProductCard;
