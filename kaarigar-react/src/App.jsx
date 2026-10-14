import { useState } from "react";
import ProductList from "./components/ProductList.jsx";
import Cart from "./components/Cart.jsx";
import CheckoutForm from "./components/CheckoutForm.jsx";

function App() {
  // Lifted state: the cart lives here, not in ProductCard
  const [cart, setCart] = useState([]); // [{ product, quantity }]
  const [showCart, setShowCart] = useState(false);
  const [orderPlaced, setOrderPlaced] = useState(false);

  const addToCart = (product) => {
    setOrderPlaced(false);
    setCart((prev) => {
      const existing = prev.find((i) => i.product.id === product.id);
      return existing
        ? prev.map((i) => (i.product.id === product.id ? { ...i, quantity: i.quantity + 1 } : i))
        : [...prev, { product, quantity: 1 }];
    });
  };

  const removeFromCart = (id) => setCart((prev) => prev.filter((i) => i.product.id !== id));

  const placeOrder = () => {
    setCart([]);
    setOrderPlaced(true);
  };

  const itemCount = cart.reduce((sum, i) => sum + i.quantity, 0);

  return (
    <>
      <header className="site-header">
        <div className="container header-inner">
          <span className="logo">Kaarigar</span>
          <button className="cart-toggle" onClick={() => setShowCart(!showCart)}>
            🛒 Cart <span className="badge">{itemCount}</span>
          </button>
        </div>
      </header>

      <main className="container">
        {showCart && (
          <section className="section">
            <h2>Your cart</h2>
            {orderPlaced && <p className="success">Order placed! Thank you for shopping with Kaarigar.</p>}
            <Cart cart={cart} removeFromCart={removeFromCart} />
            {cart.length > 0 && <CheckoutForm onPlaceOrder={placeOrder} />}
          </section>
        )}

        <section className="section">
          <h1>Products</h1>
          <ProductList addToCart={addToCart} />
        </section>
      </main>

      <footer className="site-footer">
        <div className="container">
          <p>hello@kaarigar.example · +91 98765 43210</p>
          <p>&copy; 2026 Kaarigar. All rights reserved.</p>
        </div>
      </footer>
    </>
  );
}

export default App;
