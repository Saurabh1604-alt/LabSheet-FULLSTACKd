import { useState } from "react";

function CheckoutForm({ onPlaceOrder }) {
  const [form, setForm] = useState({
    name: "",
    address: "",
    pincode: "",
    phone: "",
    payment: "upi",
  });

  // One handler for every controlled input (uses the input's name attribute)
  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    onPlaceOrder(form);
  };

  return (
    <form className="checkout-form" onSubmit={handleSubmit}>
      <h2>Checkout</h2>
      <label>
        Full name
        <input name="name" value={form.name} onChange={handleChange} required />
      </label>
      <label>
        Address
        <textarea name="address" rows="3" value={form.address} onChange={handleChange} required />
      </label>
      <label>
        Pincode
        <input name="pincode" value={form.pincode} onChange={handleChange} pattern="[0-9]{6}" maxLength="6" title="6 digits" required />
      </label>
      <label>
        Phone
        <input name="phone" value={form.phone} onChange={handleChange} pattern="[0-9]{10}" maxLength="10" title="10 digits" required />
      </label>
      <fieldset>
        <legend>Payment method</legend>
        {[["upi", "UPI"], ["card", "Credit / debit card"], ["cod", "Cash on delivery"]].map(([value, label]) => (
          <label key={value} className="radio">
            <input type="radio" name="payment" value={value} checked={form.payment === value} onChange={handleChange} />
            {label}
          </label>
        ))}
      </fieldset>
      <button type="submit" className="btn btn-accent">Place Order</button>
    </form>
  );
}

export default CheckoutForm;
