// Task 11: command-line calculator
// Usage: node calc-cli.js 10 5 +
// Note: on Linux/Mac quote the operator for * -> node calc-cli.js 10 5 "*"
const args = process.argv.slice(2);

if (args.length !== 3) {
  console.log('Usage: node calc-cli.js <num1> <num2> <operator>');
  console.log('Operators: +  -  *  /');
  process.exit(1);
}

const a = parseFloat(args[0]);
const b = parseFloat(args[1]);
const op = args[2];

if (isNaN(a) || isNaN(b)) {
  console.error('Error: both operands must be numbers.');
  process.exit(1);
}

let result;
switch (op) {
  case '+': result = a + b; break;
  case '-': result = a - b; break;
  case '*': result = a * b; break;
  case '/':
    if (b === 0) {
      console.error('Error: division by zero.');
      process.exit(1);
    }
    result = a / b;
    break;
  default:
    console.error(`Error: unsupported operator "${op}". Use + - * /`);
    process.exit(1);
}

console.log(`${a} ${op} ${b} = ${result}`);
