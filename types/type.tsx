export type TaskStatus = "pending" | "completed";

export interface Task {
  id: string;
  title: string;
  description: string;
  status: TaskStatus;
  createdAt: string; // ISO date string
}

export type FilterValue = "all" | "pending" | "completed";
