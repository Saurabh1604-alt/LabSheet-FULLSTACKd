// Task 4: path module
const path = require('path');

const filePath = '/home/user/data/report.pdf';

console.log('Directory name :', path.dirname(filePath));
console.log('Base name      :', path.basename(filePath));
console.log('Extension      :', path.extname(filePath));
console.log('Name w/o ext   :', path.basename(filePath, path.extname(filePath)));

const relative = './docs/notes.txt';
console.log('Relative path  :', relative);
console.log('Absolute path  :', path.resolve(relative));
