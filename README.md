
![Uploading Screenshot (275).png…]()
















Full Stack Web Development: Lab Work

Lab projects for the Full Stack Web Development course at COER University, Roorkee (Department of Computer Science & Engineering).

The main project is Kaarigar, a small e-commerce store for handmade Indian goods. It is built in phases: plain HTML and CSS, then JavaScript, then React, then a Node.js + Express API.

Folders
Folder	What it is	Lab
kaarigar-frontend/	Store website in HTML, CSS and JavaScript: home, products, product detail, cart and checkout pages	Phases 1 to 3
kaarigar-react/	The product list, cart and checkout form rebuilt with React (components, props, useState)	Lab Sheet 3
api-lab/	Task Manager Mini App: Express REST API with a plain JS client and a React client	Lab Sheet 6
kaarigar-frontend
Five pages: index.html, products.html, product-detail.html, cart.html, checkout.html.
style.css uses CSS variables, Flexbox, Grid and a mobile @media query.
script.js renders the products from an array, keeps the cart in localStorage, shows a cart count in the navbar, calculates the total, and validates the checkout form with inline error messages.

Run: open kaarigar-frontend/index.html in a browser.

kaarigar-react
Components: ProductCard, ProductList, Cart and CheckoutForm.
Cart state lives in App and is passed down as props. The cart can be shown or hidden and shows an item-count badge.

Run:

cd kaarigar-react
npm install
npm run dev
api-lab
server/: Express API with 5 CRUD routes on in-memory tasks (no database), a logger, an x-api-key check on POST, PUT and DELETE, CORS, a 404 handler and a central error handler.
client/: plain JavaScript client using fetch.
client-react/: React client with loading and error states, add and delete.
postman/: Postman collection for all the endpoints.

Run:

cd api-lab/server
npm install
npm run dev

Then in a second terminal:

cd api-lab/client-react
npm install
npm run dev

Copy .env.example to .env in both folders and set your own values. The .env files are not committed.

Tech used

HTML, CSS, JavaScript, React (Vite), Node.js, Express, Postman.

Author

Saurabh, B.Tech CSE, COER University (2028 batch)
