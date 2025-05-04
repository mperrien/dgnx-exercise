import { ref, computed } from "vue";
import { defineStore } from "pinia";

import type { Task, Tasks } from "@/types/tasks";

export const useTasksStore = defineStore("tasks", () => {
  const tasks = ref<Task[]>([]);
  const isFetching = ref<boolean>(false);

  const sortedTasks = computed<Tasks>(() => {
    const object: Tasks = {
      to_do: [],
      in_progress: [],
      done: [],
    };
    tasks.value.forEach((task) => {
      if (task.status === "to-do") {
        object.to_do.push(task);
      }
      if (task.status === "in-progress") {
        object.in_progress.push(task);
      }
      if (task.status === "done") {
        object.done.push(task);
      }
    });
    return object;
  });

  async function fetchTasks() {
    isFetching.value = true;
    // Reset tasks to empty arrays to avoid duplicates
    tasks.value = [];
    try {
      const response = await fetch("https://q1z3telex7a9metry.denaliops.com/data.json");
      if (!response.ok) {
        const json = await response.json();
        throw new Error(json.status_message);
      } else {
        const json: Task[] = await response.json();
        let id: number = 0;
        json.forEach((task) => {
          task.id = id;
          tasks.value.push(task);
          id++;
        });
      }
    } catch (e) {
      console.error((e as Error).message);
    } finally {
      isFetching.value = false;
    }
  }

  function updateTaskStatus(id: number, status: "to-do" | "in-progress" | "done") {
    const index = tasks.value.findIndex((t) => t.id === id);
    if (index !== -1) {
      tasks.value[index].status = status;
    }
  }

  return { tasks, sortedTasks, isFetching, fetchTasks, updateTaskStatus };
});
