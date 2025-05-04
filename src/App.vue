<script setup lang="ts">
import { RouterView } from "vue-router";
import TheMenu from "@/components/menu/TheMenu.vue";
</script>

<template>
  <div class="grid">
    <TheMenu />
    <main class="main">
      <RouterView />
    </main>
  </div>
</template>

<style scoped>
.grid {
  display: grid;
  grid-template-columns: auto 1fr;
  min-height: 100vh;
}

.main {
  padding: var(--spacing-lg);
}
</style>
