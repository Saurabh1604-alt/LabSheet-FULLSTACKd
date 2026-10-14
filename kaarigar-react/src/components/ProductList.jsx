import { products } from "../products.js";
import ProductCard from "./ProductCard.jsx";

function ProductList({ addToCart }) {
  return (
    <div className="product-grid">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} addToCart={addToCart} />
      ))}
    </div>
  );
}

export default ProductList;
