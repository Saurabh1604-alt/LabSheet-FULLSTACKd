// Task 6: custom EventEmitter
const EventEmitter = require('events').EventEmitter;

const orders = new EventEmitter();

orders.on('orderPlaced', (order) => {
  console.log('--------- RECEIPT ---------');
  console.log(`Order ID : ${order.id}`);
  console.log(`Item     : ${order.item}`);
  console.log(`Amount   : Rs. ${order.amount.toFixed(2)}`);
  console.log('---------------------------\n');
});

orders.emit('orderPlaced', { id: 101, item: 'Laptop Stand', amount: 1499 });
orders.emit('orderPlaced', { id: 102, item: 'Mechanical Keyboard', amount: 3299.5 });
orders.emit('orderPlaced', { id: 103, item: 'USB-C Cable', amount: 349 });
