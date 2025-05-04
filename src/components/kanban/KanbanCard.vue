<script setup lang="ts">
import { toRefs } from "vue";

import type Task from "@/types/tasks";

const props = defineProps<{
  task: Task;
}>();
const { task } = toRefs(props);
</script>

<template>
  <li class="kanban-card" :style="`--background-color: ${task.color}`">
    <h3 class="kanban-card__title">{{ task.title }}</h3>
  </li>
</template>

<style scoped>
.kanban-card {
  background-color: var(--background-color);
}
</style>
