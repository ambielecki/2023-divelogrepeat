<script setup>
  import { useUserStore } from "../stores/user";
  import { ref } from 'vue';
  import AuthProvider from "../providers/AuthProvider";
  import router from "../router";

  const userStore = useUserStore();
  const password = ref('');
  const email = ref('');

  async function login() {
    const response = await AuthProvider.login({
      email: email.value,
      password: password.value,
    });

    if (response) {
      userStore.access_token = response.access_token;

      const user = await AuthProvider.getUser();
      if (user) {
        userStore.$patch({
          user: user,
          is_logged_in: true,
        });

        router.push({ name: 'home' })
      }
    }

    console.log(response);
  }
</script>

<template>
  <div v-if="userStore.is_logged_in">
    You are already logged in
  </div>
  <div v-else class="columns is-centered">
    <div class="column is-half">
      <div class="card">
        <div class="card-content">
          <p class="title is-4">Login</p>
          <div class="columns is-multiline">
            <div class="column is-full">
              <div class="field">
                <label class="label" for="email">Email</label>
                <div class="control">
                  <input
                      id="email"
                      class="input"
                      type="text"
                      placeholder="Email Address"
                      v-model="email"
                      @keyup.enter="login"
                  >
                </div>
<!--                <p class="help is-danger" v-if="$v.email.$anyError">-->
<!--                  Email is required and must be in a valid format-->
<!--                </p>-->
              </div>
            </div>

            <div class="column is-full">
              <div class="field">
                <label class="label" for="password">Password</label>
                <div class="control">
                  <input
                      id="password"
                      class="input"
                      type="password"
                      placeholder="Password"
                      v-model="password"
                      @keyup.enter="login"
                  >
                </div>
<!--                <p class="help is-danger" v-if="$v.password.$anyError">-->
<!--                  Password is required-->
<!--                </p>-->
              </div>
            </div>
          </div>

          <div class="columns">
            <div class="column is-full">
              <div class="field is-grouped">
                <div class="control">
                  <button class="button is-info" @click="login" data-test="login-button">Login</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>