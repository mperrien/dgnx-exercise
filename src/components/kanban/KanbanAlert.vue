<script setup lang="ts">
import { toRefs, computed, watch, useTemplateRef } from "vue";

import type Task from "@/types/tasks";

const props = defineProps<{
  task: Task | null;
}>();

const { task } = toRefs(props);

const thisTask = computed<Task | null>(() => {
  if (!task.value) return null;
  return {
    title: task.value.title,
    color: task.value.color,
    status: task.value.status,
  };
});

const dialog = useTemplateRef("alert");

watch(
  () => task.value,
  () => {
    if (task.value !== null) {
      dialog.value.showModal();
    }
  },
);
</script>

<template>
  <dialog class="kanban-alert" ref="alert">
    <header class="kanban-alert__header">
      <h2>Card updated</h2>
    </header>
    <div class="kanban-alert__content">
      <pre>{{ JSON.stringify(thisTask, null, 2) }}</pre>
    </div>
    <footer class="kanban-alert__footer">
      <button type="button" class="kanban-alert__close" @click="dialog.close()">Close</button>
    </footer>
  </dialog>
</template>

<style scoped>
.kanban-alert {
  padding: 0;
  min-width: var(--dialog-width);

  border: none;
  border-radius: var(--dialog-border-radius);
  box-shadow: var(--box-shadow);
  outline: none;
}

.kanban-alert__header {
  background-color: var(--dialog-header-background);
  color: var(--dialog-header-color);
  padding: var(--dialog-padding);
}

.kanban-alert__content {
  padding: var(--dialog-padding);

  pre {
    margin: 0;

    font-family: var(--font);
    font-size: var(--dialog-content-font-size);
    text-transform: var(--dialog-content-text-transform);
  }
}

.kanban-alert__footer {
  display: flex;
  justify-content: flex-end;
  padding: var(--spacing-3xs);

  border-top: 0.1rem solid var(--dialog-footer-border-color);
}

.kanban-alert__close {
  padding: var(--dialog-button-padding);

  border: none;
  background-color: var(--dialog-button-background);
  cursor: pointer;

  color: var(--dialog-button-color);
  font-size: var(--dialog-button-font-size);
  font-weight: var(--dialog-button-font-weight);
  text-transform: var(--dialog-button-text-transform);
}
</style>
