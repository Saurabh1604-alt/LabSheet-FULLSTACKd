import { useState } from "react";

export default function AddTaskForm({ onAdd }) {
  const [title, setTitle] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    onAdd(title);
    setTitle("");
  };

  return (
    <form onSubmit={handleSubmit}>
      <input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="New task title" />
      <button type="submit">Add task</button>
    </form>
  );
}
