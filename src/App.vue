<script setup>
import { RouterLink, RouterView } from 'vue-router'
import TopNav from "./components/TopNav.vue";
</script>

<template>
  <TopNav />
  <div class="container-fluid">
    <RouterView />
  </div>
</template>

<style scoped>

</style>
