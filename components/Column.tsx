"use client";

import TaskCard from "./TaskCard";
import { useDroppable } from "@dnd-kit/core";
import { Task } from "@/types";
import { Circle, Clock, CheckCircle2 } from "lucide-react";

const columnConfig = {
  todo: {
    icon: <Circle className="w-4 h-4" />,
    headerClass: "column-header-todo",
    emptyText: "No tasks yet, create one from the sidebar!",
  },
  doing: {
    icon: <Clock className="w-4 h-4" />,
    headerClass: "column-header-doing",
    emptyText: "Drag a task here to start working on it",
  },
  done: {
    icon: <CheckCircle2 className="w-4 h-4" />,
    headerClass: "column-header-done",
    emptyText: "Completed tasks will appear here",
  },
};

export default function Column({
  title,
  id,
  tasks,
}: {
  title: string;
  id: Task["status"];
  tasks: Task[];
}) {
  const { setNodeRef, isOver } = useDroppable({ id });
  const config = columnConfig[id];
  const columnTasks = tasks.filter((t) => t.status === id);

  return (
    <div
      ref={setNodeRef}
      className={`rounded-2xl border transition-all flex flex-col ${isOver ? "border-orange-500/50 shadow-lg shadow-orange-500/10" : "border-neutral-800"
        }`}
      style={{
        background: 'var(--bg-card)',
      }}
    >
  
      <div className="flex items-center justify-between p-4 pb-3 border-b border-neutral-800/50">
        <div className={`flex items-center gap-2 font-semibold text-sm ${config.headerClass}`}>
          {config.icon}
          {title}
        </div>
        <span className="text-xs font-bold px-2 py-0.5 rounded-full text-orange-500"
          style={{ background: 'rgba(249, 115, 22, 0.1)' }}
        >
          {columnTasks.length}
        </span>
      </div>


      <div className="flex-1 overflow-y-auto p-3 space-y-2.5" style={{ minHeight: '200px' }}>
        {columnTasks.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-12 text-neutral-500">
            <div className="w-3 h-3 rounded-full bg-orange-500 opacity-30 mb-3" />
            <p className="text-xs text-center px-4">{config.emptyText}</p>
          </div>
        ) : (
          columnTasks.map((task) => (
            <TaskCard key={task.id} task={task} />
          ))
        )}
      </div>
    </div>
  );
}
