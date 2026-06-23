import { createContext, useContext, useState, ReactNode } from "react";

import * as Crypto from "expo-crypto";
import type { Task, TaskStatus } from "@/types/type";

interface TasksContextValue {
  tasks: Task[];
  loading: boolean;
  addTask: (input: { title: string; description: string }) => Promise<Task>;
  updateTask: (
    id: string,
    patch: Partial<Pick<Task, "title" | "description" | "status">>,
  ) => Promise<void>;
  toggleTask: (id: string) => Promise<void>;
  deleteTask: (id: string) => Promise<void>;
  getTaskById: (id: string) => Task | undefined;
}

export const todo: Task[] = [
  {
    id: "1",
    title: "Setup project",
    description: "Initialize repo, install dependencies, and configure tooling",
    status: "completed",
    createdAt: "2026-06-01T09:15:00Z",
  },
  {
    id: "3",
    title: "Create dashboard UI",
    description: "Design and implement main dashboard layout with charts",
    status: "pending",
    createdAt: "2026-06-05T18:45:00Z",
  },
  {
    id: "4",
    title: "Fix responsive issues",
    description: "Adjust layout for mobile and tablet breakpoints",
    status: "completed",
    createdAt: "2026-06-08T08:20:00Z",
  },
  {
    id: "5",
    title: "API integration",
    description: "Connect frontend with backend REST endpoints",
    status: "pending",
    createdAt: "2026-06-10T14:10:00Z",
  },
];

const TasksContext = createContext<TasksContextValue | null>(null);

function generateId() {
  return Crypto.randomUUID();
}

export function TasksProvider({ children }: { children: ReactNode }) {
  const [tasks, setTasks] = useState<Task[]>(todo);
  const [loading] = useState(false);

  const addTask = async ({
    title,
    description,
  }: {
    title: string;
    description: string;
  }) => {
    const newTask: Task = {
      id: generateId(),
      title: title.trim(),
      description: description.trim(),
      status: "pending" as TaskStatus,
      createdAt: new Date().toISOString(),
    };

    setTasks((prev) => [newTask, ...prev]);
    return newTask;
  };

  const updateTask = async (
    id: string,
    patch: Partial<Pick<Task, "title" | "description" | "status">>,
  ) => {
    setTasks((prev) =>
      prev.map((task) => (task.id === id ? { ...task, ...patch } : task)),
    );
  };

  const toggleTask = async (id: string) => {
    setTasks((prev) =>
      prev.map((task) =>
        task.id === id
          ? {
              ...task,
              status: task.status === "completed" ? "pending" : "completed",
            }
          : task,
      ),
    );
  };

  const deleteTask = async (id: string) => {
    setTasks((prev) => prev.filter((task) => task.id !== id));
  };

  const getTaskById = (id: string) => tasks.find((task) => task.id === id);

  const value: TasksContextValue = {
    tasks,
    loading,
    addTask,
    updateTask,
    toggleTask,
    deleteTask,
    getTaskById,
  };
  return (
    <TasksContext.Provider value={value}>{children}</TasksContext.Provider>
  );
}

export function useTasks() {
  const ctx = useContext(TasksContext);

  if (!ctx) {
    throw new Error("useTasks must be used within TasksProvider");
  }

  return ctx;
}
