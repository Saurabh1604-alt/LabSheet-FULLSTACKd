const API_URL = "http://localhost:5000/api";
const statusEl = document.getElementById("status");
const listEl = document.getElementById("task-list");

async function loadTasks() {
  statusEl.textContent = "Loading...";
  try {
    const res = await fetch(`${API_URL}/tasks`);
    if (!res.ok) throw new Error(`Server responded with ${res.status}`);
    const tasks = await res.json();
    listEl.innerHTML = tasks.map((t) => `<li>${t.title}</li>`).join("");
    statusEl.textContent = "";
  } catch (err) {
    listEl.innerHTML = "";
    statusEl.textContent = `Could not load tasks: ${err.message}. Is the server running?`;
  }
}

loadTasks();
