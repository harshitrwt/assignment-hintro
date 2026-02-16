"use client";

import { useState } from "react";
import { useApp } from "@/context/AppContext";
import { generateId, now } from "@/lib/helper";
import { Priority } from "@/types";
import { Plus, Type, AlignLeft, Flag } from "lucide-react";

export default function TaskForm() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [priority, setPriority] = useState<Priority>("low");
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

  return (
    <div className="space-y-5">
      <div>
        <h3 className="text-lg font-bold text-white mb-1">Create Task</h3>
        <p className="text-xs text-zinc-500">Add a new task to your board</p>
      </div>

      <form onSubmit={addTask} className="space-y-4">
        <div className="space-y-1.5">
          <label className="text-xs font-medium text-zinc-400 flex items-center gap-1.5">
            <Type className="w-3 h-3" /> Title
          </label>
          <input
            className="w-full h-10 px-3 rounded-lg border border-orange-600 text-sm text-white placeholder-zinc-500 focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500 transition-colors"
            style={{ background: 'var(--bg-card)' }}
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="What needs to be done?"
            required
          />
        </div>

        <div className="space-y-1.5">
          <label className="text-xs font-medium text-zinc-400 flex items-center gap-1.5">
            <AlignLeft className="w-3 h-3" /> Description
          </label>
          <textarea
            className="w-full h-20 px-3 py-2 rounded-lg border border-orange-600 text-sm text-white placeholder-zinc-500 focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500 transition-colors resize-none"
            style={{ background: 'var(--bg-card)' }}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Optional description..."
          />
        </div>

        {/* Priority */}
        <div className="space-y-1.5">
          <label className="text-xs font-medium text-zinc-400 flex items-center gap-1.5">
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
                      ? "border-emerald-500/50 bg-emerald-500/20 text-emerald-400"
                      : p === "medium"
                        ? "border-amber-500/50 bg-amber-500/20 text-amber-400"
                        : "border-rose-500/50 bg-rose-500/20 text-rose-400"
                    : "border-zinc-700 bg-zinc-800/50 text-zinc-400 hover:border-zinc-600"
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
          className="w-full h-10 rounded-lg bg-orange-500 text-white text-sm font-semibold shadow-lg shadow-orange-500/20 hover:shadow-orange-500/40 transition-all hover:scale-[1.02] disabled:opacity-40 disabled:hover:scale-100 flex items-center justify-center gap-2 cursor-pointer"
        >
          <Plus className="w-4 h-4" />
          Add Task
        </button>
      </form>

    
      <div className="border-t border-zinc-700 pt-5 space-y-4">
        <FilterSort />
      </div>
    </div>
  );
}

function FilterSort() {
  const { state, dispatch } = useApp();

  return (
    <>
      <div className="space-y-1.5">
        <label className="text-xs font-medium text-zinc-400">Filter by Priority</label>
        <div className="flex flex-wrap gap-1.5">
          {["all", "low", "medium", "high"].map((f) => (
            <button
              key={f}
              onClick={() => dispatch({ type: "SET_FILTER", payload: f })}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium capitalize transition-all cursor-pointer border ${state.filter === f
                  ? "border-orange-500/50 bg-orange-500/20 text-orange-300"
                  : "border-zinc-700 bg-zinc-800/50 text-zinc-400 hover:border-zinc-600"
                }`}
            >
              {f}
            </button>
          ))}
        </div>
      </div>

     
      <div className="space-y-1.5">
        <label className="text-xs font-medium text-zinc-400">Sort by</label>
        <select
          value={state.sort}
          onChange={(e) => dispatch({ type: "SET_SORT", payload: e.target.value as any })}
          className="w-full h-9 px-3 rounded-lg border border-zinc-700 text-sm text-white focus:outline-none focus:border-indigo-500 cursor-pointer"
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
