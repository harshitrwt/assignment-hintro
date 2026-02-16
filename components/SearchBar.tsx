"use client";
import { useApp } from "@/context/AppContext";
import { Search } from "lucide-react";

export default function SearchBar() {
  const { dispatch } = useApp();
  return (
    <div className="relative">
      <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" />
      <input
        type="text"
        placeholder="Search tasks..."
        className="w-full h-10 pl-10 pr-4 rounded-xl border border-zinc-700 text-sm text-white placeholder-zinc-500 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all"
        style={{ background: 'var(--bg-card)' }}
        onChange={(e) => dispatch({ type: "SET_SEARCH", payload: e.target.value })}
      />
    </div>
  );
}
