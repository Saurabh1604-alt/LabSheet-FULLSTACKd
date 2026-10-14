// Q4(b): the same GET /tasks call written with axios instead of fetch (not used by the app).
//
// Differences from fetch:
// - JSON parsing: axios parses the body for you (res.data); fetch needs `await res.json()`.
// - Error handling: axios rejects the promise on any non-2xx status (err.response.status,
//   err.response.data), so one catch covers it. fetch only rejects on network failure;
//   you must check `res.ok` yourself.
import axios from "axios";
import { API_URL } from "./api.js";

export async function fetchTasksAxios() {
  try {
    const res = await axios.get(`${API_URL}/tasks`);
    return res.data;
  } catch (err) {
    if (err.response) throw new Error(`${err.response.data?.error?.message} (${err.response.status})`);
    throw new Error("Cannot reach the server. Is it running?");
  }
}
