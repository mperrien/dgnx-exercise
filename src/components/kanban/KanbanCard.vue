<script setup lang="ts">
import { toRefs } from "vue";

import type Task from "@/types/tasks";

const props = defineProps<{
  task: Task;
}>();
const { task } = toRefs(props);
</script>

<template>
  <li class="kanban-card" :style="`--background-color: ${task.color}`" :data-id="task.id">
    <h3 class="kanban-card__title">{{ task.title }}</h3>
  </li>
</template>

<style scoped>
.kanban-card {
  display: flex;
  align-items: center;
  padding: var(--kanban-card-padding);

  background-color: var(--background-color);
  border: var(--kanban-card-border);
  border-radius: var(--kanban-card-border-radius);
  cursor: grab;

  transition: all 0.3s ease-in-out;

  @media (max-width: 80rem) {
    flex: 1 1 0;
  }

  &:hover {
    box-shadow: var(--box-shadow);
  }
}
</style>
