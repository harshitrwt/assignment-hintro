"use client";

import ProtectedRoute from "@/components/ProtectedRoute";
import TaskBoard from "@/components/TaskBoard";
import TaskForm from "@/components/TaskForm";
import ActivityLog from "@/components/ActivityLog";
import BoardNavbar from "@/components/BoardNavbar";
import BoardFooter from "@/components/BoardFooter";

export default function BoardPage() {
  return (
    <ProtectedRoute>
      <div className="h-screen flex flex-col" style={{ background: 'var(--bg-primary)' }}>
        <BoardNavbar />

        <main className="flex-1 flex flex-col md:flex-row overflow-y-auto md:overflow-hidden">
          <aside className="w-full md:w-72 flex-shrink-0 border-b md:border-b-0 md:border-r border-neutral-800 p-4 md:overflow-y-auto"
            style={{ background: 'var(--bg-secondary)' }}
          >
            <TaskForm />
          </aside>


          <div className="flex-1 p-4 sm:p-6 overflow-x-auto overflow-y-auto">
            <TaskBoard />
          </div>
          <aside className="w-full md:w-72 flex-shrink-0 border-t md:border-t-0 md:border-l border-neutral-800 overflow-hidden flex flex-col"
            style={{ background: 'var(--bg-secondary)' }}
          >
            <ActivityLog />
          </aside>
        </main>

        <BoardFooter />
      </div>
    </ProtectedRoute>
  );
}
