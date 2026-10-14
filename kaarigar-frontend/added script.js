const products = [
  { id: 1, name: "Indigo Block-Print Tote", price: 649, image: "images/p1.svg" },
  { id: 2, name: "Brass Diya Set of 4", price: 899, image: "images/p2.svg" },
  { id: 3, name: "Jute Woven Basket", price: 1199, image: "images/p3.svg" },
  { id: 4, name: "Blue Pottery Mug", price: 429, image: "images/p4.svg" },
  { id: 5, name: "Handloom Cotton Stole", price: 1499, image: "images/p5.svg" },
  { id: 6, name: "Terracotta Planter", price: 549, image: "images/p6.svg" },
  { id: 7, name: "Madhubani Art Print", price: 799, image: "images/p7.svg" },
  { id: 8, name: "Kantha Throw Blanket", price: 2799, image: "images/p8.svg" },
];

let cart = JSON.parse(localStorage.getItem("cart") || "[]"); // [{ id, qty }]
const $ = (sel) => document.querySelector(sel);
const money = (n) => "₹" + n.toLocaleString("en-IN");
const find = (id) => products.find((p) => p.id === id);

function save() {
  localStorage.setItem("cart", JSON.stringify(cart));
  $("#cart-count").textContent = cart.reduce((sum, i) => sum + i.qty, 0);
}

function calculateTotal() {
  const total = cart.reduce((sum, i) => sum + find(i.id).price * i.qty, 0);
  $("#cart-total").textContent = money(total);
  document.querySelectorAll("[data-sub]").forEach((td) => {
    const item = cart.find((i) => i.id === +td.dataset.sub);
    td.textContent = money(find(item.id).price * item.qty);
  });
}

// Product grids (home = first 4, products page = all)
document.querySelectorAll("[data-products]").forEach((grid) => {
  grid.innerHTML = products.slice(0, +grid.dataset.limit || products.length).map((p) => `
    <article class="product-card">
      <a href="product-detail.html"><img src="${p.image}" alt="${p.name}"></a>
      <div class="card-body">
        <h3><a href="product-detail.html">${p.name}</a></h3>
        <p class="price">${money(p.price)}</p>
        <button type="button" class="btn" data-add="${p.id}">Add to Cart</button>
      </div>
    </article>`).join("");
});

// Add to Cart (works on grids and on the detail page)
document.addEventListener("click", (e) => {
  const btn = e.target.closest("[data-add]");
  if (!btn) return;
  const id = +btn.dataset.add;
  const qty = +($("#qty")?.value) || 1;
  const item = cart.find((i) => i.id === id);
  item ? (item.qty += qty) : cart.push({ id, qty });
  save();
  btn.textContent = "Added";
  setTimeout(() => (btn.textContent = "Add to Cart"), 1000);
});

// Cart page
const body = $("#cart-body");
if (body) {
  const render = () => {
    body.innerHTML = cart.length ? cart.map(({ id, qty }) => {
      const p = find(id);
      return `<tr>
        <td data-label="Item">${p.name}</td>
        <td data-label="Quantity"><input type="number" min="1" value="${qty}" data-qty="${id}" aria-label="Quantity for ${p.name}"></td>
        <td data-label="Price">${money(p.price)}</td>
        <td data-label="Subtotal" data-sub="${id}"></td>
        <td><button type="button" class="btn btn-outline" data-remove="${id}">Remove</button></td>
      </tr>`;
    }).join("") : `<tr><td colspan="5">Your cart is empty.</td></tr>`;
    calculateTotal();
  };
  body.addEventListener("input", (e) => {
    if (!e.target.dataset.qty) return;
    cart.find((i) => i.id === +e.target.dataset.qty).qty = Math.max(1, +e.target.value || 1);
    save();
    calculateTotal();
  });
  body.addEventListener("click", (e) => {
    if (!e.target.dataset.remove) return;
    cart = cart.filter((i) => i.id !== +e.target.dataset.remove);
    save();
    render();
  });
  render();
}

// Checkout validation
const form = $("#checkout-form");
if (form) {
  const rules = {
    name: (v) => (v.trim() ? "" : "Enter your name."),
    address: (v) => (v.trim() ? "" : "Enter your address."),
    pincode: (v) => (/^\d{6}$/.test(v) ? "" : "Pincode must be exactly 6 digits."),
    phone: (v) => (/^\d{10}$/.test(v) ? "" : "Phone must be exactly 10 digits."),
  };
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    let ok = true;
    for (const key in rules) {
      const msg = rules[key](form.elements[key].value);
      $("#err-" + key).textContent = msg;
      if (msg) ok = false;
    }
    if (!ok) return;
    cart = [];
    save();
    form.hidden = true;
    $("#confirmation").hidden = false;
  });
}

save(); // shows the cart count in the navbar on every page
