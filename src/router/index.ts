import { createRouter, createWebHistory } from "vue-router";
import TasksView from "@/views/TasksView.vue";
import NotificationsView from "@/views/NotificationsView.vue";
import SettingsView from "@/views/SettingsView.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "tasks",
      component: TasksView,
    },
    {
      path: "/notifications",
      name: "notifications",
      component: NotificationsView,
    },
    {
      path: "/settings",
      name: "settings",
      component: SettingsView,
    },
  ],
});

export default router;
