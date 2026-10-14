# API Lab: Task Manager Mini App

```
api-lab/
  server/        Express API (in-memory tasks, no database)
  client/        Plain JS client (index.html + script.js)
  client-react/  React (Vite) client
  postman/       API-Lab.postman_collection.json
```

## Run it

**Server** (http://localhost:5000)
```
cd server
npm install
npm run dev        # nodemon; use "npm start" for plain node
```
`server/.env` holds `PORT`, `API_KEY` and `ENABLE_CORS`. It is listed in `.gitignore`; `.env.example` shows the format.

**Plain JS client**: open `client/index.html` in the browser (or use Live Server) with the server running.

**React client** (http://localhost:5173)
```
cd client-react
npm install
npm run dev
```
The API URL and key come from `client-react/.env` (`VITE_API_URL`, `VITE_API_KEY`). Vite bakes `VITE_*` values into the browser bundle, so the key is visible to anyone using the page. That is fine for this lab, but a real app should not ship a secret this way.

## API

| Method | URL | Key needed | Notes |
|---|---|---|---|
| GET | /api/tasks | no | list |
| GET | /api/tasks/:id | no | 404 if missing |
| POST | /api/tasks | yes | body `{ "title": "..." }`, returns 201 |
| PUT | /api/tasks/:id | yes | body `{ "title"?, "completed"? }` |
| DELETE | /api/tasks/:id | yes | 404 if missing |

Every error uses one shape: `{ "error": { "status": 404, "message": "..." } }`.
`GET /api/boom` throws on purpose so you can see the central error handler return a 500.

## Things you must do and record yourself

These need a browser or Postman, so they are not pre-filled:

1. **Q2(a) CORS experiment.** Set `ENABLE_CORS=false` in `server/.env` and restart. Open the React app (or `client/index.html` served from another origin) and copy the exact error from the browser console. It normally reads: *Access to fetch at 'http://localhost:5000/api/tasks' from origin 'http://localhost:5173' has been blocked by CORS policy: No 'Access-Control-Allow-Origin' header is present on the requested resource.* Check that yours matches, then set `ENABLE_CORS=true`, restart, and confirm the list loads.
2. **Q2(b) Postman.** Import `postman/API-Lab.postman_collection.json`. Run "GET all tasks" (works without a key) and "POST without key" (401). Screenshot "POST new task" showing the body and the 201 response.
3. **Q3(c) Plain JS failure path.** With the page open, stop the server and reload. The page should show "Could not load tasks: ... Is the server running?".
4. **Q5(a) Error tests in React.** Click "Test 404: delete id 9999" and check that the UI shows "Task 9999 not found (404)" and the server log shows the request. For 401, put a wrong `VITE_API_KEY` in `client-react/.env`, restart Vite, and try adding a task.

## Q4(b): fetch vs axios

`client-react/src/fetchTasksAxios.js` has the axios version of the GET call. The app itself uses fetch. axios parses JSON for you (`res.data`) and rejects on any non-2xx status; fetch needs `res.json()` and a manual `res.ok` check, and only rejects on network failure.
