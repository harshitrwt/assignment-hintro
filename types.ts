export type Status = "todo" | "doing" | "done";

export type Priority = "low" | "medium" | "high";

export type SortOption = "newest" | "oldest" | "priority" | "title";

export type Task = {
  id: string;
  title: string;
  description?: string;
  priority: Priority;
  dueDate?: string;
  tags: string[];
  status: Status;
  createdAt: string;
};

export type ActivityEvent = {
  id: string;
  type: "created" | "edited" | "moved" | "deleted";
  taskId: string;
  taskTitle: string;
  description: string;
  timestamp: string;
};

export type AuthSession = {
  email: string;
  isAuthenticated: boolean;
};
