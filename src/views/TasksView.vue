<script setup lang="ts">
import { ref, onBeforeMount } from "vue";

import { useTasksStore } from "@/stores/tasks";

import KanbanColumn from "@/components/kanban/KanbanColumn.vue";
import KanbanAlert from "@/components/kanban/KanbanAlert.vue";

const tasksStore = useTasksStore();

const alertTask = ref<Task | null>(null);
function updateAlertTask(task: Task) {
  alertTask.value = { ...task };
}

onBeforeMount(async () => {
  await tasksStore.fetchTasks();
});
</script>

<template>
  <div class="tasks">
    <h1>Tasks</h1>
    <div v-if="tasksStore.isFetching" class="loading">
      <p>Loading tasks...</p>
    </div>
    <div v-else class="kanban-columns">
      <KanbanColumn
        title="To-Do"
        :tasks="tasksStore.sortedTasks.to_do"
        group="to-do"
        @task-moved="updateAlertTask"
      />
      <KanbanColumn
        title="In-Progress"
        :tasks="tasksStore.sortedTasks.in_progress"
        group="in-progress"
        @task-moved="updateAlertTask"
      />
      <KanbanColumn
        title="Done"
        :tasks="tasksStore.sortedTasks.done"
        group="done"
        @task-moved="updateAlertTask"
      />
    </div>
    <KanbanAlert :task="alertTask" ref="alert" />
  </div>
</template>

<style scoped>
.tasks {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-lg);
  height: 100%;

  .kanban-columns {
    display: grid;
    grid-template: repeat(3, 1fr) / 1fr;
    gap: var(--kanban-column-gap);
    flex-grow: 1;

    @media (min-width: 80rem) {
      grid-template: 1fr / repeat(3, 1fr);
    }
  }
}
</style>
