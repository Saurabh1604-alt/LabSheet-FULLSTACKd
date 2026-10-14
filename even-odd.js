// Task 1: custom module exporting an even/odd checker
function evenOdd(n) {
  return n % 2 === 0 ? 'even' : 'odd';
}

module.exports = evenOdd;
