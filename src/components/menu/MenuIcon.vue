<script setup lang="ts">
import { toRefs } from "vue";

import IconNotifications from "@/components/icons/IconNotifications.vue";
import IconSettings from "@/components/icons/IconSettings.vue";
import IconTasks from "@/components/icons/IconTasks.vue";

const props = defineProps<{
  icon: string;
}>();
const { icon } = toRefs(props);
</script>

<template>
  <div class="menu-icon">
    <IconNotifications v-if="icon === 'notifications'" />
    <IconSettings v-else-if="icon === 'settings'" />
    <IconTasks v-else-if="icon === 'tasks'" />
  </div>
</template>
