// Task 12: environment variables
// Linux/Mac : PORT=5000 node env-demo.js
// Windows   : set PORT=5000 && node env-demo.js
const http = require('http');

const PORT = process.env.PORT || 4000;

const server = http.createServer((req, res) => {
  res.writeHead(200, { 'Content-Type': 'text/plain' });
  res.end(`Hello! Server is running on port ${PORT}\n`);
});

server.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
