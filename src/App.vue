<script setup>
  import { RouterLink, RouterView } from 'vue-router'
  import TopNav from "./components/TopNav.vue";
</script>

<style scoped>
  .app_container {
    padding-top: 1rem;
  }
</style>

<template>
  <TopNav />
  <div class="container app_container">
    <RouterView />
  </div>
</template>
