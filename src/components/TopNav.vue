<script setup>
import { computed, onMounted } from "vue";
  import { useUserStore } from "@/stores/user";
  import { useAlertStore } from "@/stores/alert";
  import authProvider from "../providers/AuthProvider";
  import { ref } from 'vue';

  const userStore = useUserStore();
  const is_loading = ref(false);

  const is_admin = computed(() => {
    return useUserStore().user?.is_admin;
  });

  onMounted(() => {
    const $navbarBurgers = Array.prototype.slice.call(document.querySelectorAll('.navbar-burger'), 0);

    // Add a click event on each of them
    $navbarBurgers.forEach( el => {
      el.addEventListener('click', () => {

        // Get the target from the "data-target" attribute
        const target = el.dataset.target;
        const $target = document.getElementById(target);

        // Toggle the "is-active" class on both the "navbar-burger" and the "navbar-menu"
        el.classList.toggle('is-active');
        $target.classList.toggle('is-active');
      });
    });
  });

  async function logOut() {
    is_loading.value = true;
    if (userStore.getMillisecondsUntilExpiration() > 0) {
      await authProvider.logout();
    }

    userStore.logOut();

    is_loading.value = false;

    useAlertStore().addAlert('Successfully Logged Out.')
  }
</script>

<template>
  <nav class="navbar is-info is-fixed-top" role="navigation" aria-label="main navigation">
    <div class="navbar-brand">
      <router-link :to="{ name: 'home' }" class="navbar-item" data-test="navbar-home">DiveLogRepeat</router-link>

      <a role="button" class="navbar-burger" aria-label="menu" aria-expanded="false" data-target="divelog_navbar">
        <span aria-hidden="true"></span>
        <span aria-hidden="true"></span>
        <span aria-hidden="true"></span>
      </a>
    </div>

    <div id="divelog_navbar" class="navbar-menu">
      <div class="navbar-start">
        <router-link :to="{ name: 'blog_list' }" class="navbar-item" data-test="blog">Blog</router-link>
        <router-link :to="{ name: 'dive_calculator' }" class="navbar-item" data-test="calculator">Dive Calculator</router-link>
        <Transition>
          <router-link v-if="userStore.is_logged_in" :to="{ name: 'dive_log' }" class="navbar-item" data-test="log">Dive Log</router-link>
        </Transition>
        <Transition>
          <router-link v-if="is_admin" :to="{ name: 'admin_index' }" class="navbar-item" data-test="admin">Admin</router-link>
        </Transition>
      </div>

      <div class="navbar-end">
        <div class="navbar-item">
          <div v-if="!userStore.is_logged_in" class="field is-grouped">
            <p class="control">
              <router-link :to="{ name: 'register' }" data-test="sign_up">
                <button class="button is-info is-light">
                  <strong>Sign Up</strong>
                </button>
              </router-link>
            </p>
            <p class="control">
              <router-link :to="{ name: 'login' }" data-test="log_in">
                <button class="button is-info is-light">
                  <strong>Log In</strong>
                </button>
              </router-link>
            </p>
          </div>

          <div v-else class="buttons">
            <button @click="logOut" class="button is-info is-light" :class="{ 'is-loading': is_loading }" data-test="log_out">
              <strong>Log Out</strong>
            </button>
          </div>
        </div>
      </div>
    </div>
  </nav>
</template>

<style scoped>
.navbar-item {
  &.has-dropdown {
    .navbar-dropdown {
      display: none;
    }
    &.is-hoverable:hover {
      .navbar-dropdown {
        display: block;
      }
    }
  }
}

.navbar-dropdown {
  z-index: 100 !important;
}
</style>