"use client";

import { useApp } from "@/context/AppContext";
import { ActivityEvent } from "@/types";
import { History, Trash2, Plus, Pencil, ArrowRightLeft, Trash, AlertTriangle } from "lucide-react";
import { useState } from "react";

const typeConfig = {
  created: {
    icon: <Plus className="w-3 h-3" />,
    color: "text-emerald-400",
    bg: "bg-emerald-500/15",
    border: "border-emerald-500/30",
    label: "Created",
  },
  edited: {
    icon: <Pencil className="w-3 h-3" />,
    color: "text-orange-400",
    bg: "bg-orange-500/15",
    border: "border-orange-500/30",
    label: "Edited",
  },
  moved: {
    icon: <ArrowRightLeft className="w-3 h-3" />,
    color: "text-amber-400",
    bg: "bg-amber-500/15",
    border: "border-amber-500/30",
    label: "Moved",
  },
  deleted: {
    icon: <Trash className="w-3 h-3" />,
    color: "text-rose-400",
    bg: "bg-rose-500/15",
    border: "border-rose-500/30",
    label: "Deleted",
  },
};

function formatTimeAgo(dateStr: string) {
  const now = Date.now();
  const then = new Date(dateStr).getTime();
  const diffMs = now - then;
  const diffMin = Math.floor(diffMs / 60000);
  const diffHr = Math.floor(diffMin / 60);
  const diffDay = Math.floor(diffHr / 24);

  if (diffMin < 1) return "Just now";
  if (diffMin < 60) return `${diffMin}m ago`;
  if (diffHr < 24) return `${diffHr}h ago`;
  return `${diffDay}d ago`;
}

export default function ActivityLog() {
  const { state, dispatch } = useApp();
  const [showClearConfirm, setShowClearConfirm] = useState(false);

  const handleClear = () => {
    dispatch({ type: "CLEAR_ACTIVITY" });
    setShowClearConfirm(false);
  };

  return (
    <div className="flex flex-col h-full">
      <div className="flex items-center justify-between p-4 border-b border-zinc-800/50">
        <div className="flex items-center gap-2">
          <History className="w-4 h-4 text-indigo-400" />
          <h3 className="text-sm font-bold text-white">Activity Log</h3>
          {state.activity.length > 0 && (
            <span className="text-[10px] font-bold text-zinc-500 bg-zinc-800 px-1.5 py-0.5 rounded-full">
              {state.activity.length}
            </span>
          )}
        </div>
        {state.activity.length > 0 && (
          <button
            onClick={() => setShowClearConfirm(true)}
            className="p-1.5 rounded-lg text-zinc-500 hover:text-rose-400 hover:bg-rose-500/10 transition-all cursor-pointer"
            title="Clear all activity"
          >
            <Trash2 className="w-3.5 h-3.5" />
          </button>
        )}
      </div>

   
      {showClearConfirm && (
        <div className="mx-4 mt-3 p-3 rounded-xl border border-rose-500/30 bg-rose-500/10 space-y-2">
          <div className="flex items-center gap-2 text-rose-400">
            <AlertTriangle className="w-4 h-4" />
            <span className="text-xs font-semibold">Clear all activity?</span>
          </div>
          <p className="text-[10px] text-zinc-400">This will permanently remove all activity history.</p>
          <div className="flex gap-2">
            <button
              onClick={handleClear}
              className="flex-1 py-1.5 rounded-lg bg-rose-500/20 border border-rose-500/30 text-rose-400 text-xs font-medium hover:bg-rose-500/30 transition-all cursor-pointer"
            >
              Yes, Clear All
            </button>
            <button
              onClick={() => setShowClearConfirm(false)}
              className="flex-1 py-1.5 rounded-lg bg-zinc-700/30 border border-zinc-600 text-zinc-400 text-xs font-medium hover:bg-zinc-600/30 transition-all cursor-pointer"
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      <div className="flex-1 overflow-y-auto p-3 space-y-2">
        {state.activity.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-16 text-zinc-600">
            <History className="w-8 h-8 mb-3 opacity-30" />
            <p className="text-xs">No activity yet</p>
            <p className="text-[10px] text-zinc-700 mt-1">Actions will appear here</p>
          </div>
        ) : (
          state.activity.map((a: ActivityEvent) => {
            const config = typeConfig[a.type];
            return (
              <div
                key={a.id}
                className={`rounded-lg border ${config.border} ${config.bg} p-2.5 transition-all hover:scale-[1.01]`}
              >
                <div className="flex items-start gap-2">
                  <div className={`mt-0.5 ${config.color}`}>
                    {config.icon}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-1.5 mb-0.5">
                      <span className={`text-[10px] font-bold uppercase ${config.color}`}>
                        {config.label}
                      </span>
                    </div>
                    <p className="text-xs text-zinc-300 leading-relaxed">
                      {a.description}
                    </p>
                    <p className="text-[10px] text-zinc-500 mt-1">
                      {formatTimeAgo(a.timestamp)}
                    </p>
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}
