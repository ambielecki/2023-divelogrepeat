<script setup>
import { RouterView, useRoute } from 'vue-router'
  import TopNav from "./components/TopNav.vue";
  import Alerts from "./components/Alerts.vue";
  import { useUserStore } from "./stores/user";
  import { useAlertStore } from "./stores/alert";
  import AuthProvider from "./providers/AuthProvider";
  import { computed, onMounted } from "vue";
import Footer from "@/components/Footer.vue";

  setInterval(() => {
    if (useUserStore().is_logged_in) {
      if (useUserStore().getMillisecondsUntilExpiration() <= (30 * 60000)) {
        if (useUserStore().getMillisecondsUntilExpiration() <= 0) {
          useUserStore().reset();
          useAlertStore().addAlert(
              'Your session has expired, please log in again',
              useAlertStore().warning,
          );
        } else {
          AuthProvider.refreshToken()
              .then((response) => {
                useUserStore().setToken(response.access_token, response.expires_in);
              });
        }
      }
    }
  }, 60000);

  const route = useRoute();

  const is_home_page = computed(() => {
    return route.path === '/';
  });

  const container_class = computed(() => {
    return !is_home_page.value ? 'container app_container' : '';
  });

  onMounted(() => {
    AuthProvider.checkCachedToken();
    const router_div = document.querySelector('#router_div');

    router_div.addEventListener('click', () => {
      document.querySelector('#divelog_navbar').classList.remove('is-active');
      document.querySelector('#divelog_navbar_burger').classList.remove('is-active');
    });

  });
</script>

<style scoped>
  .app_container {
    padding-top: 1rem;
  }
</style>

<template>
<div class="main_container">
  <TopNav />
  <Alerts />
  <div :class="container_class" id="router_div">
    <RouterView />
  </div>

</div>
<Footer />
</template>

<style>
.main_container {
  min-height: calc(100vh - 3.5rem);
}
</style>