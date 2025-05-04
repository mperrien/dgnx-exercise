import { ref } from "vue";
import { defineStore } from "pinia";

import type { Task, Tasks } from "@/types/tasks";

export const useTasksStore = defineStore("tasks", () => {
  const tasks = ref<Tasks>({
    to_do: [],
    in_progress: [],
    done: [],
  });
  const isFetching = ref<boolean>(false);

  async function fetchTasks() {
    isFetching.value = true;
    // Reset tasks to empty arrays to avoid duplicates
    tasks.value = {
      to_do: [],
      in_progress: [],
      done: [],
    };
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
          if (task.status === "to-do") {
            tasks.value.to_do.push(task);
          }
          if (task.status === "in-progress") {
            tasks.value.in_progress.push(task);
          }
          if (task.status === "done") {
            tasks.value.done.push(task);
          }
          id++;
        });
      }
    } catch (e) {
      console.error((e as Error).message);
    } finally {
      isFetching.value = false;
    }
  }

  return { tasks, isFetching, fetchTasks };
});
