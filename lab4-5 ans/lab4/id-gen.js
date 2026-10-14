// Task 10: nanoid v3 (CommonJS compatible)
// Setup:  npm init -y   &&   npm install nanoid@3
const { nanoid } = require('nanoid');

console.log('5 unique IDs:');
for (let i = 1; i <= 5; i++) {
  console.log(`${i}. ${nanoid()}`);
}
