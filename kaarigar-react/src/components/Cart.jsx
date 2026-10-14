function Cart({ cart, removeFromCart }) {
  // Conditional rendering: early return when the cart is empty
  if (cart.length === 0) {
    return <p className="empty">Your cart is empty</p>;
  }

  const total = cart.reduce((sum, i) => sum + i.product.price * i.quantity, 0);

  return (
    <div className="table-wrap">
      <table className="cart-table">
        <thead>
          <tr>
            <th>Item</th>
            <th>Quantity</th>
            <th>Subtotal</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {cart.map(({ product, quantity }) => (
            <tr key={product.id}>
              <td>{product.name}</td>
              <td>{quantity}</td>
              <td>₹{(product.price * quantity).toLocaleString("en-IN")}</td>
              <td>
                <button className="btn btn-outline" onClick={() => removeFromCart(product.id)}>
                  Remove
                </button>
              </td>
            </tr>
          ))}
        </tbody>
        <tfoot>
          <tr className="grand-total">
            <td colSpan="2">Grand total</td>
            <td colSpan="2">₹{total.toLocaleString("en-IN")}</td>
          </tr>
        </tfoot>
      </table>
    </div>
  );
}

export default Cart;
