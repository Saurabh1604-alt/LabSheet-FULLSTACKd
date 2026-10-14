// Task 1: import both custom modules and use them
const sum = require('./sum');
const evenOdd = require('./even-odd');

console.log('Sum of 12 and 8 =', sum(12, 8));
console.log('Sum of -3 and 10 =', sum(-3, 10));

console.log('7 is', evenOdd(7));
console.log('20 is', evenOdd(20));
