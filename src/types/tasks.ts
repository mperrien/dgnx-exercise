export interface Task {
  id?: number;
  title: string;
  color: string;
  status: "to-do" | "in-progress" | "done";
}

export interface Tasks {
  to_do: Task[];
  in_progress: Task[];
  done: Task[];
}
