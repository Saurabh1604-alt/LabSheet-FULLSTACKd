import { useEffect, useState } from "react";
import { request, API_KEY } from "../api.js";
import AddTaskForm from "./AddTaskForm.jsx";

export default function TaskList() {
  // 3-state pattern: data, loading, error
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [actionError, setActionError] = useState(null); // errors from add / delete

  useEffect(() => {
    request("/tasks")
      .then(setTasks)
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  const addTask = async (title) => {
    setActionError(null);
    try {
      const created = await request("/tasks", {
        method: "POST",
        headers: { "Content-Type": "application/json", "x-api-key": API_KEY },
        body: JSON.stringify({ title }),
      });
      setTasks((prev) => [...prev, created]); // UI updates without reload
    } catch (err) {
      setActionError(err.message);
    }
  };

  const deleteTask = async (id) => {
    setActionError(null);
    try {
      await request(`/tasks/${id}`, { method: "DELETE", headers: { "x-api-key": API_KEY } });
      setTasks((prev) => prev.filter((t) => t.id !== id));
    } catch (err) {
      setActionError(err.message);
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p className="error">Could not load tasks: {error}</p>;

  return (
    <>
      <AddTaskForm onAdd={addTask} />
      {actionError && <p className="error">{actionError}</p>}
      <ul>
        {tasks.map((t) => (
          <li key={t.id}>
            {t.title}
            <button onClick={() => deleteTask(t.id)}>Delete</button>
          </li>
        ))}
      </ul>
      {/* Q5(a) test button: expect a readable "Task 9999 not found (404)" message */}
      <button className="test" onClick={() => deleteTask(9999)}>Test 404: delete id 9999</button>
    </>
  );
}
