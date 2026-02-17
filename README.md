# TaskFlow

A lightweight Kanban-style task manager built with **Next.js + TypeScript**. TaskFlow demonstrates drag‑and‑drop boards, local persistence, simple (mock) auth, filters/search, and animated UI components, ideal as a front-end assignment or starter kit.

![Taskflow](image.png)
---

## Quick overview

- Purpose: interactive task/kanban board with persistent state and activity log
- Stack: `Next.js (App Router)`, `React`, `TypeScript`, `Tailwind CSS`, `@dnd-kit` for DnD, `framer-motion` + `gsap` for animations
- Persistence: `localStorage` / `sessionStorage` via a small storage helper



## Key features

- Drag & drop tasks between columns (`To Do`, `Doing`, `Done`) using `@dnd-kit`
- Add / edit / delete tasks and track activity history
- Search, filter (by priority), and sort tasks
- Mock authentication (demo credentials) with optional "remember me"
- Responsive, animated UI built with Tailwind + shadcn/radix primitives

---

## Project structure (high level)

- `app/`: Next.js App Router pages (`/`, `/board`, `/login`)
- `components/`: UI components and feature pieces (`TaskBoard`, `TaskCard`, `TaskForm`, `Column`, etc.)
- `components/ui/`: small design-system primitives (buttons, inputs, cards)
- `context/`: `AppContext` (global reducer + provider)
- `hooks/`: reusable hooks (`useAuth`, `useLocalStorage`)
- `lib/`: helpers and `storage` wrapper around `localStorage`/`sessionStorage`
- `public/`: static assets (images, icons, screenshots)
- `types.ts`: TypeScript types and shared interfaces

Key files to inspect:
- `context/AppContext.tsx`: application state reducer + persistence sync
- `components/TaskBoard.tsx`: drag & drop integration and task sorting/filtering
- `hooks/useAuth.ts`: simple login/logout helpers (demo creds)
- `lib/storage.ts`: local/session storage abstraction


## Technologies & tools used

- Next.js (App Router) & React (TypeScript)
- Tailwind CSS for utility-first styling
- @dnd-kit (drag & drop)
- framer-motion & gsap for UI animations
- lucide-react icons, radix UI primitives, shadcn UI helpers
- ESLint + TypeScript for dev tooling

---

## How it works

1. Global state is managed in `AppContext` using `useReducer` (actions: add/edit/move/delete task).
2. Drag-and-drop is implemented with `@dnd-kit` in `TaskBoard` and `Column` components — on drop we dispatch `MOVE_TASK`.
3. Persistence: app state is saved to `localStorage` by `AppContext` (or `sessionStorage` when "remember me" is disabled).
4. Auth is mocked in `useAuth`.
5. UI: composed from small reusable primitives in `components/ui`, styled with Tailwind and animated via `framer-motion`/`gsap`.

---

## Run locally

1. Install dependencies

   ```bash
   npm install
   ```

2. Start dev server

   ```bash
   npm run dev
   # and then open http://localhost:3000
   ```

3. Build / start production

   ```bash
   npm run build
   npm start
   ```


## Screenshots


### Dashboard / Board

  ![Dashboard](dashboard.png)

### Task create / edit modal
  ![Taskcreate](createTask.png)

### Activity log & filters
![ActivityLog](activity.png)

---



