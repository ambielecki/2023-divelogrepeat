<script setup>
  import { onMounted } from "vue";
  import { useUserStore } from "../stores/user";
  import AuthProvider from "../providers/AuthProvider";
  import authProvider from "../providers/AuthProvider";
  import { ref } from 'vue';

  const userStore = useUserStore();
  const is_loading = ref(false);

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
    await authProvider.logout();

    userStore.$patch({
      user: {},
      access_token: '',
      is_logged_in: false,
    });

    is_loading.value = false;
  }
</script>

<template>
  <nav class="navbar is-info is-fixed-top" role="navigation" aria-label="main navigation">
    <div class="navbar-brand">
      <router-link :to="{ name: 'home' }" class="navbar-item">DiveLogRepeat</router-link>

      <a role="button" class="navbar-burger" aria-label="menu" aria-expanded="false" data-target="divelog_navbar">
        <span aria-hidden="true"></span>
        <span aria-hidden="true"></span>
        <span aria-hidden="true"></span>
      </a>
    </div>

    <div id="divelog_navbar" class="navbar-menu">
      <div class="navbar-start">
        <router-link :to="{ name: 'dive_calculator' }" class="navbar-item">Dive Calculator</router-link>
      </div>

      <div class="navbar-end">
        <div class="navbar-item">
            <div v-if="!userStore.is_logged_in" class="buttons">
              <a class="button is-info is-light">
                <strong>Sign up</strong>
              </a>
              <router-link :to="{ name: 'login' }" class="button is-info is-light"><strong>Log In</strong></router-link>
            </div>
            <div v-else="userStore.is_logged_in" class="buttons">
              <div @click="logOut" class="button is-info is-light" :class="{ 'is-loading': is_loading }">
                <strong>Log Out</strong>
              </div>
            </div>
        </div>
      </div>
    </div>
  </nav>
</template>