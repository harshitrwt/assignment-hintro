"use client";

import { useState } from "react";
import { useApp } from "@/context/AppContext";
import { generateId, now } from "@/lib/helper";
import { Priority } from "@/types";
import { Plus, Type, AlignLeft, Flag, AlertTriangle, ChevronDown, ChevronUp } from "lucide-react";

export default function TaskForm() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [priority, setPriority] = useState<Priority>("low");
  const [showResetConfirm, setShowResetConfirm] = useState(false);
  const { dispatch } = useApp();

  const addTask = (e?: React.FormEvent) => {
    e?.preventDefault();
    if (!title.trim()) return;
    dispatch({
      type: "ADD_TASK",
      payload: {
        id: generateId(),
        title: title.trim(),
        description: description.trim() || undefined,
        status: "todo",
        priority,
        tags: [],
        createdAt: now(),
      },
    });
    setTitle("");
    setDescription("");
    setPriority("low");
  };

  const handleResetBoard = () => {
    dispatch({ type: "RESET_BOARD" });
    setShowResetConfirm(false);
  };

  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-bold text-primary mb-1">Create Task</h3>
          <p className="text-xs text-secondary">Add a new task to your board</p>
        </div>

        <button
          type="button"
          onClick={() => setShowResetConfirm(true)}
          className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg border border-orange-500/40 bg-orange-500/10 text-orange-500 hover:bg-orange-500/20 transition-all cursor-pointer"
        >
          Reset
        </button>
      </div>

      {showResetConfirm && (
        <div className="p-3 rounded-xl border border-rose-500/30 bg-rose-500/10 space-y-2">
          <div className="flex items-center gap-2 text-rose-400">
            <AlertTriangle className="w-4 h-4" />
            <span className="text-xs font-semibold">Reset entire board?</span>
          </div>

          <p className="text-[10px] text-secondary">
            This will permanently remove all tasks from all columns.
          </p>

          <div className="flex gap-2">
            <button
              onClick={handleResetBoard}
              className="flex-1 py-1.5 rounded-lg bg-rose-500/20 border border-rose-500/30 text-rose-400 text-xs font-medium hover:bg-rose-500/30 transition-all cursor-pointer"
            >
              Yes, Reset
            </button>

            <button
              onClick={() => setShowResetConfirm(false)}
              className="flex-1 py-1.5 rounded-lg bg-neutral-100 dark:bg-zinc-700/30 border border-neutral-200 dark:border-zinc-600 text-secondary text-xs font-medium hover:bg-neutral-200 dark:hover:bg-zinc-600/30 transition-all cursor-pointer"
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      <form onSubmit={addTask} className="space-y-4">
        <div className="space-y-1.5">
          <label className="text-xs font-medium text-secondary flex items-center gap-1.5">
            <Type className="w-3 h-3" /> Title
          </label>
          <input
            className="w-full h-10 px-3 rounded-lg border border-orange-600 text-sm text-primary placeholder-zinc-500 focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500 transition-colors"
            style={{ background: 'var(--bg-card)' }}
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="What needs to be done?"
            required
          />
        </div>

        <div className="space-y-1.5">
          <label className="text-xs font-medium text-secondary flex items-center gap-1.5">
            <AlignLeft className="w-3 h-3" /> Description
          </label>
          <textarea
            className="w-full h-20 px-3 py-2 rounded-lg border border-orange-600 text-sm text-primary placeholder-zinc-500 focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500 transition-colors resize-none"
            style={{ background: 'var(--bg-card)' }}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Optional description..."
          />
        </div>

        {/* Mobile Toggle for rest of content */}
        <div
          className="flex items-center justify-center py-2 md:hidden cursor-pointer text-orange-500"
          onClick={() => setIsExpanded(!isExpanded)}
        >
          {isExpanded ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
        </div>

        <div className={`${isExpanded ? 'block' : 'hidden'} md:block space-y-4`}>
          {/* Priority */}
          <div className="space-y-1.5">
            <label className="text-xs font-medium text-secondary flex items-center gap-1.5">
              <Flag className="w-3 h-3" /> Priority
            </label>
            <div className="flex gap-2">
              {(["low", "medium", "high"] as Priority[]).map((p) => (
                <button
                  key={p}
                  type="button"
                  onClick={() => setPriority(p)}
                  className={`flex-1 py-2 rounded-lg text-xs font-semibold capitalize transition-all cursor-pointer border ${priority === p
                    ? p === "low"
                      ? "border-emerald-500/50 bg-emerald-500/20 text-emerald-600 dark:text-emerald-400"
                      : p === "medium"
                        ? "border-amber-500/50 bg-amber-500/20 text-amber-600 dark:text-amber-400"
                        : "border-rose-500/50 bg-rose-500/20 text-rose-600 dark:text-rose-400"
                    : "border-neutral-200 dark:border-zinc-700 bg-neutral-100 dark:bg-zinc-800/50 text-secondary hover:border-neutral-300 dark:hover:border-zinc-600"
                    }`}
                >
                  {p}
                </button>
              ))}
            </div>
          </div>

          <button
            type="submit"
            disabled={!title.trim()}
            className="w-full h-10 rounded-lg bg-orange-500 text-black dark:text-white text-sm font-semibold shadow-lg shadow-orange-500/20 hover:shadow-orange-500/40 transition-all hover:scale-[1.02] disabled:opacity-40 disabled:hover:scale-100 flex items-center justify-center gap-2 cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            Add Task
          </button>

          <div className="border-t border-neutral-200 dark:border-zinc-700 pt-5 space-y-4">
            <FilterSort />
          </div>
        </div>
      </form>
    </div>
  );
}

function FilterSort() {
  const { state, dispatch } = useApp();

  return (
    <>
      <div className="space-y-1.5">
        <label className="text-xs font-medium text-secondary">Filter by Priority</label>
        <div className="flex flex-wrap gap-1.5">
          {["all", "low", "medium", "high"].map((f) => (
            <button
              key={f}
              onClick={() => dispatch({ type: "SET_FILTER", payload: f })}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium capitalize transition-all cursor-pointer border ${state.filter === f
                ? "border-orange-500/50 bg-orange-500/20 text-orange-300"
                : "border-neutral-200 dark:border-zinc-700 bg-neutral-100 dark:bg-zinc-800/50 text-secondary hover:border-neutral-300 dark:hover:border-zinc-600"
                }`}
            >
              {f}
            </button>
          ))}
        </div>
      </div>


      <div className="space-y-1.5">
        <label className="text-xs font-medium text-secondary">Sort by</label>
        <select
          value={state.sort}
          onChange={(e) => dispatch({ type: "SET_SORT", payload: e.target.value as any })}
          className="w-full h-9 px-3 rounded-lg border border-neutral-200 dark:border-zinc-700 text-sm text-primary focus:outline-none focus:border-indigo-500 cursor-pointer"
          style={{ background: 'var(--bg-card)' }}
        >
          <option value="newest">Newest First</option>
          <option value="oldest">Oldest First</option>
          <option value="priority">Priority (High → Low)</option>
          <option value="title">Title (A → Z)</option>
        </select>
      </div>
    </>
  );
}
