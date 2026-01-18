# Task Management App – TODOs

## Backend (Node + Express + TypeScript + MongoDB/Mongoose)
- [x] Use Express with TypeScript as backend framework
- [x] Initialize backend project structure with TypeScript and linting
- [x] Set up environment config (.env for Mongo URI and JWT secret)
- [x] Install and configure Mongoose for MongoDB
- [x] Configure MongoDB connection using Mongoose
- [x] Define Mongoose User schema/model (username, password hash, timestamps)
- [x] Define Mongoose Task schema/model (title, description, status, user ref)
- [x] Ensure proper relations via user reference in Task model
- [ ] Seed development database with a test user (optional)
- [x] Implement POST /api/auth/register (create user, hash password)
- [x] Implement POST /api/auth/login (validate credentials, return JWT)
- [x] Implement JWT generation and verification utilities
- [x] Implement auth middleware to verify JWT and attach user to request
- [x] Implement GET /api/tasks (return tasks for logged-in user)
- [x] Implement POST /api/tasks (create task for logged-in user)
- [x] Implement PUT /api/tasks/:id (update task owned by logged-in user)
- [x] Implement DELETE /api/tasks/:id (delete task owned by logged-in user)
- [x] Enforce “user can only access own tasks” in all task endpoints
- [x] Add backend request body validation and error handling
- [x] Standardize API response format (success, error, validation messages)
- [ ] (Optional) Add Jest + Supertest tests for auth routes
- [ ] (Optional) Add Jest + Supertest tests for task CRUD routes
- [ ] (Optional) Add tests for auth/JWT middleware and authorization
- [x] Add npm scripts to run backend, tests, and coverage report

## Frontend (React + TypeScript + Redux Toolkit + TailwindCSS)
- [x] Initialize React app (Vite/Webpack) with TypeScript
- [x] Configure TailwindCSS (base styles, theme, global layout)
- [x] Set up routing (public vs protected routes)
- [x] Configure Axios instance (base URL, interceptors for JWT, error handling)
- [x] Set up Redux Toolkit store (configureStore, Provider wiring)
- [x] Create auth slice (user, token, loading, error states)
- [ ] Create tasks slice (tasks list, loading, error states)
- [ ] Persist JWT token securely (localStorage) and hydrate auth state
- [ ] Implement route guard for protected pages using auth state
- [ ] Implement registration page with form (React Hook Form/Formik + Zod)
- [ ] Add client-side validation for registration form fields
- [ ] Wire registration form to POST /api/auth/register
- [ ] Implement login page with form (React Hook Form/Formik + Zod)
- [ ] Add client-side validation for login form fields
- [ ] Wire login form to POST /api/auth/login and store JWT in Redux
- [ ] Implement logout behavior (clear token, Redux state, redirect)
- [ ] Implement protected task list page (view user’s tasks)
- [ ] Implement create task flow (form, POST /api/tasks)
- [ ] Implement update task flow (edit UI, PUT /api/tasks/:id)
- [ ] Implement delete task flow (UI action, DELETE /api/tasks/:id)
- [ ] Support task fields: title, description (optional), status (pending/completed)
- [ ] Add UI states: loading, error, empty list, and success feedback
- [ ] Handle expired/invalid JWT globally (e.g., auto-logout or prompt login)
- [ ] (Optional) Add Jest + React Testing Library tests for forms and components
- [ ] (Optional) Add frontend test coverage reporting
- [ ] Add npm scripts to run frontend dev server, build, tests, and coverage

## Integration & Documentation (MERN)
- [ ] Connect frontend to backend API using environment-based URLs
- [ ] Verify CORS configuration between frontend and backend
- [ ] Test full auth flow (register → login → token stored → protected routes)
- [ ] Test full task flow (create → list → update → delete) per logged-in user
- [ ] Ensure unauthorized requests to task endpoints are rejected correctly
- [ ] Ensure users cannot access or modify other users’ tasks
- [ ] Add README instructions for local setup (backend & frontend with MongoDB)
- [ ] Document how to run backend and frontend in development
- [ ] Document how to run tests and generate coverage reports
- [ ] Document all API endpoints with sample requests/responses (including auth and tasks)
- [ ] Perform final manual QA pass before submission
