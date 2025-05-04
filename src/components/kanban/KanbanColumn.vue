<script setup lang="ts">
import { toRefs, ref, onMounted } from "vue";
import draggable from "vuedraggable";

import { useTasksStore } from "@/stores/tasks";

import type Task from "@/types/tasks";

import KanbanCard from "@/components/kanban/KanbanCard.vue";

const props = defineProps<{
  title: string;
  tasks: Task[];
  group: string;
}>();
const { title, tasks, group } = toRefs(props);

const emit = defineEmits<{
  taskMoved: [task: Task];
}>();

const tasksStore = useTasksStore();

const thisTasks = ref<Tasks[]>([]);

function onDragEnd(evt: unknown) {
  const newGroup = evt.to.dataset.group;
  const movedTaskId = parseInt(evt.item.dataset.id);

  tasksStore.updateTaskStatus(movedTaskId, newGroup);
  const movedTask = tasks.value.find((task) => task.id === movedTaskId);
  if (movedTask) {
    emit("taskMoved", movedTask);
  }
}

onMounted(() => {
  thisTasks.value = tasks.value;
});
</script>

<template>
  <section class="kanban-column">
    <h2 class="kanban-column__title">{{ title }}</h2>
    <draggable
      v-model="thisTasks"
      group="kanban"
      tag="ul"
      @start="drag = true"
      @end="onDragEnd"
      item-key="id"
      :data-group="group"
    >
      <template #item="{ element }">
        <KanbanCard :task="element" />
      </template>
    </draggable>
  </section>
</template>

<style scoped>
.kanban-column {
  display: flex;
  flex-direction: column;
  min-height: 100%;
  padding: var(--kanban-column-padding);
  overflow-x: scroll;

  border: var(--kanban-column-border);
  border-radius: var(--kanban-column-border-radius);

  ul {
    display: flex;
    flex-grow: 1;
    flex-direction: row;
    gap: var(--kanban-column-gap);
    margin: var(--kanban-column-gap) 0 0;
    padding: 0;

    list-style-type: none;

    @media (min-width: 80rem) {
      flex-direction: column;
    }
  }
}
</style>
