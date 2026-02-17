# TaskFlow

A lightweight Kanban-style task manager built with **Next.js + TypeScript**. TaskFlow demonstrates drag‑and‑drop boards, local persistence, simple (mock) auth, filters/search, and animated UI components — ideal as a front-end assignment or starter kit.

---

## Quick overview

- Purpose: interactive task/kanban board with persistent state and activity log
- Stack: `Next.js (App Router)`, `React`, `TypeScript`, `Tailwind CSS`, `@dnd-kit` for DnD, `framer-motion` + `gsap` for animations
- Persistence: `localStorage` / `sessionStorage` via a small storage helper

---

## Key features

- Drag & drop tasks between columns (`To Do`, `Doing`, `Done`) using `@dnd-kit`
- Add / edit / delete tasks and track activity history
- Search, filter (by priority), and sort tasks
- Mock authentication (demo credentials) with optional "remember me"
- Responsive, animated UI built with Tailwind + shadcn/radix primitives

---

## Project structure (high level)

- `app/` — Next.js App Router pages (`/`, `/board`, `/login`)
- `components/` — UI components and feature pieces (`TaskBoard`, `TaskCard`, `TaskForm`, `Column`, etc.)
- `components/ui/` — small design-system primitives (buttons, inputs, cards)
- `context/` — `AppContext` (global reducer + provider)
- `hooks/` — reusable hooks (`useAuth`, `useLocalStorage`)
- `lib/` — helpers and `storage` wrapper around `localStorage`/`sessionStorage`
- `public/` — static assets (images, icons, screenshots)
- `types.ts` — TypeScript types and shared interfaces

Key files to inspect:
- `context/AppContext.tsx` — application state reducer + persistence sync
- `components/TaskBoard.tsx` — drag & drop integration and task sorting/filtering
- `hooks/useAuth.ts` — simple login/logout helpers (demo creds)
- `lib/storage.ts` — local/session storage abstraction

---

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

## ▶️ Run locally

1. Install dependencies

   ```bash
   npm install
   ```

2. Start dev server

   ```bash
   npm run dev
   # open http://localhost:3000
   ```

3. Build / start production

   ```bash
   npm run build
   npm start
   ```

4. Lint

   ```bash
   npm run lint
   ```

---

## 🔎 Example data & demo credentials

- Demo user: `intern@demo.com` / `intern123`
- Data persistence happens in `localStorage` under the `taskboard` key — you can inspect or reset it from the browser devtools.

---

## 📁 Detailed folder map

- `app/` — route pages (root `page.tsx`, `board/page.tsx`, `login/page.tsx`)
- `components/TaskBoard.tsx` — board layout + DnD context
- `components/Column.tsx` — column wrapper (drop zone)
- `components/TaskCard.tsx` — single task card UI & actions
- `components/TaskForm.tsx` — add / edit task modal/form
- `context/AppContext.tsx` — reducer, action types, persistence sync
- `hooks/useLocalStorage.ts` — react-friendly localStorage hook
- `lib/storage.ts` — safe storage wrapper for local/session storage
- `types.ts` — shared types for `Task`, `ActivityEvent`, `AuthSession`, etc.

---

## 🖼 Screenshots (#screenshits)

> Dummy screenshot placeholders — replace these with real images in `public/screenshots/`

- Dashboard / Board

  ![Board — placeholder](./public/screenshots/board-placeholder.png)

- Task create / edit modal

  ![Task form — placeholder](./public/screenshots/taskform-placeholder.png)

- Activity log & filters

  ![Activity log — placeholder](./public/screenshots/activity-placeholder.png)

---

## 💡 Tips & extension ideas

- Add backend API + database for multi-user persistence
- Add real authentication (OAuth / JWT)
- Implement real-time collaboration with WebSockets / Pusher
- Add drag-handle accessibility improvements and keyboard DnD support

---

## Contributing

- Fork, create a feature branch, add tests if applicable, open a PR.
- Keep components small and prefer composition over prop drilling.

---

## License

MIT — feel free to reuse and extend.
