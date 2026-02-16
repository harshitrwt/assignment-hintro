"use client";
import { useApp } from "@/context/AppContext";

export default function Filters() {
  const { state, dispatch } = useApp();
  return (
    <div className="flex gap-2">
      {["all", "low", "medium", "high"].map((f) => (
        <button
          key={f}
          onClick={() => dispatch({ type: "SET_FILTER", payload: f })}
          className={`px-3 py-1.5 rounded-lg text-xs font-medium capitalize transition-all cursor-pointer border ${state.filter === f
              ? "border-indigo-500/50 bg-indigo-500/20 text-indigo-300"
              : "border-zinc-700 bg-zinc-800/50 text-zinc-400 hover:border-zinc-600"
            }`}
        >
          {f}
        </button>
      ))}
    </div>
  );
}
