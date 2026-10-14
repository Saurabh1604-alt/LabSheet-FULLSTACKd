require("dotenv").config();
const express = require("express");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 5000;

// ---------- In-memory data (no database) ----------
let tasks = [
  { id: 1, title: "Learn Express routing", completed: true },
  { id: 2, title: "Build the CRUD API", completed: true },
  { id: 3, title: "Add middleware", completed: false },
  { id: 4, title: "Test with Postman", completed: false },
  { id: 5, title: "Connect the React client", completed: false },
];
let nextId = 6;

// ---------- Helpers ----------
const httpError = (status, message) => Object.assign(new Error(message), { status });

const findTask = (id) => {
  const task = tasks.find((t) => t.id === Number(id));
  if (!task) throw httpError(404, `Task ${id} not found`);
  return task;
};

// ---------- Middleware ----------
// Custom logger: method, URL, timestamp (applied globally)
const logger = (req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.originalUrl}`);
  next();
};

// Auth check: only used on POST, PUT and DELETE routes
const requireApiKey = (req, res, next) => {
  if (req.header("x-api-key") !== process.env.API_KEY) {
    return next(httpError(401, "Unauthorized: missing or invalid x-api-key header"));
  }
  next();
};

app.use(logger);
// Q2(a): set ENABLE_CORS=false in .env (and restart) to switch CORS off for the experiment
if (process.env.ENABLE_CORS !== "false") app.use(cors());
app.use(express.json());

// ---------- Routes ----------
app.get("/api/tasks", (req, res) => res.json(tasks));

app.get("/api/tasks/:id", (req, res) => res.json(findTask(req.params.id)));

app.post("/api/tasks", requireApiKey, (req, res) => {
  const { title } = req.body || {};
  if (typeof title !== "string" || !title.trim()) throw httpError(400, "title is required");
  const task = { id: nextId++, title: title.trim(), completed: false };
  tasks.push(task);
  res.status(201).json(task);
});

app.put("/api/tasks/:id", requireApiKey, (req, res) => {
  const task = findTask(req.params.id);
  const { title, completed } = req.body || {};
  if (title !== undefined) {
    if (typeof title !== "string" || !title.trim()) throw httpError(400, "title must be a non-empty string");
    task.title = title.trim();
  }
  if (completed !== undefined) {
    if (typeof completed !== "boolean") throw httpError(400, "completed must be true or false");
    task.completed = completed;
  }
  res.json(task);
});

app.delete("/api/tasks/:id", requireApiKey, (req, res) => {
  const task = findTask(req.params.id);
  tasks = tasks.filter((t) => t.id !== task.id);
  res.json({ message: "Task deleted", task });
});

// Handy for testing the error handler (Q2c)
app.get("/api/boom", () => {
  throw new Error("Test error from /api/boom");
});

// ---------- 404 handler (after all routes) ----------
app.use((req, res) => {
  res.status(404).json({ error: { status: 404, message: `Route ${req.method} ${req.originalUrl} not found` } });
});

// ---------- Centralized error handler (4 parameters) ----------
app.use((err, req, res, next) => {
  const status = err.status || 500;
  if (status >= 500) console.error(err);
  res.status(status).json({
    error: { status, message: status >= 500 ? "Internal server error" : err.message },
  });
});

app.listen(PORT, () => console.log(`API running on http://localhost:${PORT}`));
