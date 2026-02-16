"use client";

import { createContext, useContext, useReducer, useEffect } from "react";
import { Task, ActivityEvent, AuthSession, SortOption } from "@/types";
import { storage } from "@/lib/storage";
import { generateId, now } from "@/lib/helper";

type State = {
  user: AuthSession | null;
  tasks: Task[];
  activity: ActivityEvent[];
  search: string;
  filter: string;
  sort: SortOption;
};

type Action =
  | { type: "LOGIN"; payload: AuthSession }
  | { type: "LOGOUT" }
  | { type: "ADD_TASK"; payload: Task }
  | { type: "EDIT_TASK"; payload: Task }
  | { type: "MOVE_TASK"; id: string; status: Task["status"] }
  | { type: "DELETE_TASK"; id: string }
  | { type: "SET_SEARCH"; payload: string }
  | { type: "SET_FILTER"; payload: string }
  | { type: "SET_SORT"; payload: SortOption }
  | { type: "CLEAR_ACTIVITY" };

const initialState: State = {
  user: null,
  tasks: [],
  activity: [],
  search: "",
  filter: "all",
  sort: "newest",
};

function getStatusLabel(status: string) {
  switch (status) {
    case "todo": return "To Do";
    case "doing": return "Doing";
    case "done": return "Done";
    default: return status;
  }
}

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case "LOGIN":
      return { ...state, user: action.payload };

    case "LOGOUT":
      return { ...state, user: null };

    case "ADD_TASK":
      return {
        ...state,
        tasks: [action.payload, ...state.tasks],
        activity: [
          {
            id: generateId(),
            type: "created",
            taskId: action.payload.id,
            taskTitle: action.payload.title,
            description: `Created task "${action.payload.title}" in To Do`,
            timestamp: now(),
          },
          ...state.activity,
        ],
      };

    case "EDIT_TASK": {
      const oldTask = state.tasks.find(t => t.id === action.payload.id);
      const changes: string[] = [];
      if (oldTask) {
        if (oldTask.title !== action.payload.title) changes.push(`title to "${action.payload.title}"`);
        if (oldTask.description !== action.payload.description) changes.push("description");
        if (oldTask.priority !== action.payload.priority) changes.push(`priority to ${action.payload.priority}`);
      }
      return {
        ...state,
        tasks: state.tasks.map(t =>
          t.id === action.payload.id ? action.payload : t
        ),
        activity: [
          {
            id: generateId(),
            type: "edited",
            taskId: action.payload.id,
            taskTitle: action.payload.title,
            description: `Edited "${action.payload.title}"${changes.length ? ": changed " + changes.join(", ") : ""}`,
            timestamp: now(),
          },
          ...state.activity,
        ],
      };
    }

    case "MOVE_TASK": {
      const task = state.tasks.find(t => t.id === action.id);
      const oldStatus = task ? getStatusLabel(task.status) : "Unknown";
      const newStatus = getStatusLabel(action.status);
      return {
        ...state,
        tasks: state.tasks.map(t =>
          t.id === action.id ? { ...t, status: action.status } : t
        ),
        activity: [
          {
            id: generateId(),
            type: "moved",
            taskId: action.id,
            taskTitle: task?.title || "Unknown Task",
            description: `Moved "${task?.title}" from ${oldStatus} → ${newStatus}`,
            timestamp: now(),
          },
          ...state.activity,
        ],
      };
    }

    case "DELETE_TASK": {
      const task = state.tasks.find(t => t.id === action.id);
      return {
        ...state,
        tasks: state.tasks.filter(t => t.id !== action.id),
        activity: [
          {
            id: generateId(),
            type: "deleted",
            taskId: action.id,
            taskTitle: task?.title || "Unknown Task",
            description: `Deleted task "${task?.title}"`,
            timestamp: now(),
          },
          ...state.activity,
        ],
      };
    }

    case "SET_SEARCH":
      return { ...state, search: action.payload };

    case "SET_FILTER":
      return { ...state, filter: action.payload };

    case "SET_SORT":
      return { ...state, sort: action.payload };

    case "CLEAR_ACTIVITY":
      return { ...state, activity: [] };

    default:
      return state;
  }
}

const AppContext = createContext<any>(null);

export function AppProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(
    reducer,
    storage.get("taskboard", initialState)
  );

  useEffect(() => {
    storage.set("taskboard", state);
  }, [state]);

  return (
    <AppContext.Provider value={{ state, dispatch }}>
      {children}
    </AppContext.Provider>
  );
}

export const useApp = () => useContext(AppContext);
