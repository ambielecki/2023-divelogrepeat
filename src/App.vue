<script setup>
  import { RouterLink, RouterView } from 'vue-router'
  import TopNav from "./components/TopNav.vue";
  import Alerts from "./components/Alerts.vue";
  import { useUserStore } from "./stores/user";
  import AuthProvider from "./providers/AuthProvider";
  import { onMounted } from "vue";

  setInterval(() => {
    if (useUserStore().is_logged_in) {
      if (useUserStore().getMillisecondsUntilExpiration() <= (30 * 60000)) {
        AuthProvider.refreshToken()
            .then((response) => {
              useUserStore().setToken(response.access_token, response.expires_in);
            });
      }
    }
  }, 60000);

  onMounted(() => {
    AuthProvider.checkCachedToken();
  });
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
