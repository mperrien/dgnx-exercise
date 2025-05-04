<script setup lang="ts">
import { ref } from "vue";
import { RouterLink } from "vue-router";

import MenuIcon from "@/components/menu/MenuIcon.vue";
import IconMenu from "@/components/icons/IconMenu.vue";

const menuItems = [
  { id: 1, name: "Tasks", path: "/" },
  { id: 2, name: "Notifications", path: "/notifications" },
  { id: 3, name: "Settings", path: "/settings" },
];

const isMenuOpen = ref<boolean>(false);
const toggleMenu = () => {
  isMenuOpen.value = !isMenuOpen.value;
};
</script>

<template>
  <div class="menu-wrapper" :class="{ 'menu-wrapper--open': isMenuOpen }">
    <div class="menu" :class="{ 'menu--open': isMenuOpen }">
      <button
        type="button"
        class="menu__toggle"
        @click.prevent="toggleMenu"
        :title="isMenuOpen ? 'Collapse menu' : 'Expand menu'"
      >
        <IconMenu />
        <span class="screen-reader-text">Menu</span>
      </button>
      <nav class="nav">
        <ul class="menu__list list-reset">
          <li v-for="item in menuItems" :key="item.id">
            <router-link :to="item.path">
              <MenuIcon :icon="item.name.toLowerCase()" />
              {{ item.name }}
            </router-link>
          </li>
        </ul>
      </nav>
    </div>
  </div>
</template>

<style scoped>
.menu-wrapper {
  width: var(--menu-width-collapsed);
  overflow: hidden;

  background-color: var(--menu-background);

  transition: all 0.3s ease-in-out;
}

.menu-wrapper--open {
  width: var(--menu-width-open);
}

.menu {
  position: fixed;

  display: flex;
  flex-direction: column;
  width: var(--menu-width-collapsed);
  overflow: hidden;

  transition: all 0.3s ease-in-out;
}

.menu--open {
  width: var(--menu-width-open);
}

.menu__toggle {
  display: flex;
  align-items: center;
  justify-content: flex-start;
  height: var(--menu-item-height);
  margin-top: var(--spacing-lg);
  margin-bottom: var(--spacing-lg);

  background-color: transparent;
  border: none;
  cursor: pointer;

  color: var(--menu-item-color);

  :deep(svg) {
    display: block;
    width: var(--menu-icon-size);
    height: var(--menu-icon-size);
  }
}

.menu__list {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-lg);

  li {
    a {
      display: flex;
      align-items: center;
      justify-content: flex-start;
      gap: var(--spacing-xxs);
      height: var(--menu-item-height);
      padding: 0 var(--spacing-xxs);

      color: var(--menu-item-color);
      text-decoration: none;

      &:hover {
        background-color: var(--menu-item-background-hover);

        color: var(--menu-item-color-hover);
      }

      :deep(svg) {
        display: block;
        width: var(--menu-icon-size);
        height: var(--menu-icon-size);
      }
    }

    a.router-link-active {
      background-color: var(--menu-item-background-active);

      color: var(--menu-item-color-active);
    }
  }
}
</style>
