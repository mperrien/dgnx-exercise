<script setup lang="ts">
import { toRefs } from "vue";

import type Task from "@/types/tasks";

import KanbanCard from "@/components/kanban/KanbanCard.vue";

const props = defineProps<{
  title: string;
  tasks: Task[];
}>();
const { title, tasks } = toRefs(props);
</script>

<template>
  <section class="kanban-column">
    <h2 class="kanban-column__title">{{ title }}</h2>
    <ul class="kanban-column__tasks list-reset">
      <KanbanCard v-for="task in tasks" :key="task.id" :data-key="task.id" :task="task" />
    </ul>
  </section>
</template>
