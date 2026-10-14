// Tasks 7 & 8: HTTP server with manual routing + query string parsing
const http = require('http');
const url = require('url');

const PORT = 3000;

const students = [
  { id: 1, name: 'Aarav Sharma', branch: 'CSE' },
  { id: 2, name: 'Diya Verma', branch: 'CSE' },
  { id: 3, name: 'Rohan Gupta', branch: 'IT' },
];

function sendJSON(res, status, data) {
  res.writeHead(status, { 'Content-Type': 'application/json' });
  res.end(JSON.stringify(data));
}

const server = http.createServer((req, res) => {
  const parsed = url.parse(req.url, true);   // true => query becomes an object
  const pathname = parsed.pathname;

  if (req.method !== 'GET') {
    return sendJSON(res, 405, { error: 'Method not allowed' });
  }

  // GET /
  if (pathname === '/') {
    res.writeHead(200, { 'Content-Type': 'text/plain' });
    return res.end('Welcome to the Node.js student server!');
  }

  // GET /students
  if (pathname === '/students') {
    return sendJSON(res, 200, students);
  }

  // GET /students/:id
  if (pathname.startsWith('/students/')) {
    const id = parseInt(pathname.split('/')[2], 10);
    const student = students.find((s) => s.id === id);
    if (student) return sendJSON(res, 200, student);
    return sendJSON(res, 404, { error: `Student with id ${pathname.split('/')[2]} not found` });
  }

  // GET /search?keyword=node   (Task 8)
  if (pathname === '/search') {
    const keyword = parsed.query.keyword;
    if (!keyword) {
      return sendJSON(res, 400, { error: 'Missing query parameter: keyword' });
    }
    return sendJSON(res, 200, { message: 'You searched for', keyword });
  }

  // Anything else -> 404 page
  res.writeHead(404, { 'Content-Type': 'text/html' });
  res.end('<h1>404 - Page Not Found</h1>');
});

server.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
