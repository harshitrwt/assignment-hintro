"use client";

import { Task, Priority } from "@/types";
import { useDraggable } from "@dnd-kit/core";
import { useApp } from "@/context/AppContext";
import { Pencil, Trash2, Clock, GripVertical } from "lucide-react";
import { useState } from "react";

function formatTime(dateStr: string) {
  const d = new Date(dateStr);
  return d.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
  }) + " · " + d.toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  });
}

export default function TaskCard({ task, isOverlay }: { task: Task; isOverlay?: boolean }) {
  const { dispatch } = useApp();
  const { attributes, listeners, setNodeRef, transform, isDragging } =
    useDraggable({ id: task.id });

  const [editing, setEditing] = useState(false);
  const [editTitle, setEditTitle] = useState(task.title);
  const [editDesc, setEditDesc] = useState(task.description || "");
  const [editPriority, setEditPriority] = useState<Priority>(task.priority);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  const handleSaveEdit = () => {
    if (!editTitle.trim()) return;
    dispatch({
      type: "EDIT_TASK",
      payload: {
        ...task,
        title: editTitle.trim(),
        description: editDesc.trim() || undefined,
        priority: editPriority,
      },
    });
    setEditing(false);
  };

  const handleDelete = () => {
    dispatch({ type: "DELETE_TASK", id: task.id });
    setShowDeleteConfirm(false);
  };

  if (isOverlay) {
    return (
      <div
        className="rounded-xl p-3 border border-orange-500/40 shadow-2xl "
        style={{
          background: 'var(--bg-card)',
          borderLeft: '3px solid #f97316',
          opacity: 0.95,
          transform: 'rotate(2deg)',
          width: '280px',
        }}
      >
        <div className="flex items-start gap-1.5 mb-1.5">
          <GripVertical className="w-3.5 h-3.5 text-secondary mt-0.5" />
          <p className="text-sm font-medium text-primary leading-snug truncate flex-1">
            {task.title}
          </p>
        </div>
        {task.description && (
          <p className="text-[11px] text-secondary leading-relaxed mb-2 line-clamp-2 pl-5">
            {task.description}
          </p>
        )}
        <div className="flex items-center justify-between pl-5">
          <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full capitalize priority-${task.priority}`}>
            {task.priority}
          </span>
          <div className="flex items-center gap-1 text-[10px] text-secondary">
            <Clock className="w-2.5 h-2.5" />
            {formatTime(task.createdAt)}
          </div>
        </div>
      </div>
    );
  }

  if (editing) {
    return (
      <div className="rounded-xl p-3 space-y-2 border border-orange-500/30" style={{ background: 'var(--bg-card)' }}>
        <input
          className="w-full px-2 py-1.5 rounded-lg border border-neutral-200 dark:border-neutral-600 text-sm text-primary focus:outline-none focus:border-orange-500"
          style={{ background: 'var(--bg-hover)' }}
          value={editTitle}
          onChange={(e) => setEditTitle(e.target.value)}
          placeholder="Task title"
          autoFocus
        />
        <textarea
          className="w-full px-2 py-1.5 rounded-lg border border-neutral-200 dark:border-neutral-600 text-xs text-primary focus:outline-none focus:border-orange-500 resize-none"
          style={{ background: 'var(--bg-hover)' }}
          value={editDesc}
          onChange={(e) => setEditDesc(e.target.value)}
          placeholder="Description (optional)"
          rows={2}
        />
        <div className="flex gap-1.5">
          {(["low", "medium", "high"] as Priority[]).map((p) => (
            <button
              key={p}
              type="button"
              onClick={() => setEditPriority(p)}
              className={`flex-1 py-1 rounded text-[10px] font-semibold capitalize transition-all cursor-pointer border ${editPriority === p
                ? p === "low"
                  ? "border-emerald-500/50 bg-emerald-500/20 text-emerald-600 dark:text-emerald-400"
                  : p === "medium"
                    ? "border-amber-500/50 bg-amber-500/20 text-amber-600 dark:text-amber-400"
                    : "border-rose-500/50 bg-rose-500/20 text-rose-600 dark:text-rose-400"
                : "border-neutral-200 dark:border-neutral-700 text-secondary"
                }`}
            >
              {p}
            </button>
          ))}
        </div>
        <div className="flex gap-2">
          <button
            onClick={handleSaveEdit}
            className="flex-1 py-1.5 rounded-lg bg-orange-500/20 border border-orange-500/30 text-orange-400 text-xs font-medium hover:bg-orange-500/30 transition-all cursor-pointer"
          >
            Save
          </button>
          <button
            onClick={() => {
              setEditing(false);
              setEditTitle(task.title);
              setEditDesc(task.description || "");
              setEditPriority(task.priority);
            }}
            className="flex-1 py-1.5 rounded-lg bg-neutral-100 dark:bg-neutral-700/30 border border-neutral-200 dark:border-neutral-600 text-secondary text-xs font-medium hover:bg-neutral-200 dark:hover:bg-neutral-600/30 transition-all cursor-pointer"
          >
            Cancel
          </button>
        </div>
      </div>
    );
  }

  if (showDeleteConfirm) {
    return (
      <div className="rounded-xl p-3 space-y-2 border border-rose-500/30" style={{ background: 'var(--bg-card)' }}>
        <p className="text-xs text-primary font-medium">Delete &quot;{task.title}&quot;?</p>
        <p className="text-[10px] text-secondary">This action cannot be undone.</p>
        <div className="flex gap-2">
          <button
            onClick={handleDelete}
            className="flex-1 py-1.5 rounded-lg bg-rose-500/20 border border-rose-500/30 text-rose-400 text-xs font-medium hover:bg-rose-500/30 transition-all cursor-pointer"
          >
            Delete
          </button>
          <button
            onClick={() => setShowDeleteConfirm(false)}
            className="flex-1 py-1.5 rounded-lg bg-neutral-100 dark:bg-neutral-700/30 border border-neutral-200 dark:border-neutral-600 text-secondary text-xs font-medium hover:bg-neutral-200 dark:hover:bg-neutral-600/30 transition-all cursor-pointer"
          >
            Cancel
          </button>
        </div>
      </div>
    );
  }

  return (
    <div
      ref={setNodeRef}
      style={{
        transform: transform
          ? `translate(${transform.x}px, ${transform.y}px)`
          : undefined,
        opacity: isDragging ? 0.3 : 1,
        zIndex: isDragging ? 999 : 1,
      }}
      className="task-card-todo rounded-xl p-3 transition-shadow hover:shadow-lg group"
    >

      <div className="flex items-start justify-between gap-2 mb-1.5">
        <div className="flex items-start gap-1.5 flex-1 min-w-0">

          <div
            {...listeners}
            {...attributes}
            className="mt-0.5 cursor-grab active:cursor-grabbing text-secondary hover:text-primary transition-colors flex-shrink-0"
          >
            <GripVertical className="w-3.5 h-3.5" />
          </div>

          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-primary leading-snug truncate">
              {task.title}
            </p>
          </div>
        </div>


        <div className="flex items-center gap-0.5 opacity-0 group-hover:opacity-100 transition-opacity">
          <button
            onClick={() => setEditing(true)}
            className="p-1 rounded hover:bg-neutral-100 dark:hover:bg-white/10 text-secondary hover:text-orange-500 transition-all cursor-pointer"
            title="Edit task"
          >
            <Pencil className="w-3 h-3" />
          </button>
          <button
            onClick={() => setShowDeleteConfirm(true)}
            className="p-1 rounded hover:bg-neutral-100 dark:hover:bg-white/10 text-secondary hover:text-rose-400 transition-all cursor-pointer"
            title="Delete task"
          >
            <Trash2 className="w-3 h-3" />
          </button>
        </div>
      </div>

      {/* Description */}
      {task.description && (
        <p className="text-[11px] text-secondary leading-relaxed mb-2 line-clamp-2 pl-5">
          {task.description}
        </p>
      )}


      <div className="flex items-center justify-between pl-5">
        <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full capitalize priority-${task.priority}`}>
          {task.priority}
        </span>
        <div className="flex items-center gap-1 text-[10px] text-secondary">
          <Clock className="w-2.5 h-2.5" />
          {formatTime(task.createdAt)}
        </div>
      </div>
    </div>
  );
}
