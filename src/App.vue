<script setup>
  import { RouterLink, RouterView } from 'vue-router'
  import TopNav from "./components/TopNav.vue";
  import Alerts from "./components/Alerts.vue";
  import { useUserStore } from "./stores/user";

  setInterval(() => {
    if (useUserStore().is_logged_in) {
      if (useUserStore().getMillisecondsUntilExpiration() <= (30 * 60000)) {
        console.log('Expires in 30 minutes, should refresh');
      }
    }

  }, 60000)
</script>

<style scoped>
  .app_container {
    padding-top: 1rem;
  }
</style>

<template>
  <TopNav />
  <Alerts />
  <div class="container app_container">
    <RouterView />
  </div>
</template>
