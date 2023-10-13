<script setup>
  import { useUserStore } from "@/stores/user";
  import { useAlertStore } from "@/stores/alert";
  import { ref, computed } from 'vue';
  import AuthProvider from "../../providers/AuthProvider";
  import validationProvider from "../../providers/ValidationProvider";
  import router from "../../router";
  import TextInput from "@/components/FormFields/TextInput.vue";

  const userStore = useUserStore();
  const password = ref('');
  const email = ref('');
  const errors = ref({
    email: [],
    password: [],
  })

  const has_errors = computed(() => {
    let return_value = false;
    for (const field in errors.value) {
      if (errors.value[field].length > 0) {
        return_value = true;
        break;
      }
    }

    return return_value;
  })

  const hide_login = ref(userStore.is_logged_in);
  const is_loading = ref(false);

  async function login() {
    is_loading.value = true;
    hide_login.value = false;

    validateForm();

    if (has_errors.value) {
      is_loading.value = false;
      return
    }

    const response = await AuthProvider.login({
      email: email.value,
      password: password.value,
    });

    if (response) {
      userStore.setToken(response.access_token, response.expires_in);

      let user_response = await AuthProvider.getUser();

      if (user_response) {
        userStore.$patch({
          user: user_response.user,
          is_logged_in: true,
        });

        useAlertStore().addAlert('Successfully Logged In');
        router.push({ name: 'home' });
      }
    }

    is_loading.value = false;
  }

  function validateForm() {
    errors.value = {
      email: [],
      password: [],
    }

    if (!email.value) {
      errors.value.email.push('Email is required.');
    }

    if (!validationProvider.validateEmail(email.value)) {
      errors.value.email.push('Must be a valid email.');
    }

    if (!password.value) {
      errors.value.password.push('Password is required.');
    }
  }
</script>

<template>
  <div v-if="hide_login">
    You are already logged in
  </div>
  <div v-else class="columns is-centered">
    <div class="column is-half">
      <div class="card">
        <div class="card-content">
          <p class="title is-4">Login</p>
          <TextInput
              input_label="Email"
              input_name="email"
              v-model="email"
              input_placeholder="Email Address"
              :errors="errors.email"
              is_stacked="true"
          />

          <TextInput
              input_label="Password"
              input_name="password"
              v-model="password"
              input_placeholder="Password"
              :errors="errors.password"
              type="password"
              is_stacked="true"
          />

<!--          <div class="field">-->
<!--            <div class="control">-->
<!--              <router-link :to="{ name: 'forgot_password' }">Forgot Password?</router-link>-->
<!--            </div>-->
<!--          </div>-->

          <div class="field is-grouped is-horizontal">
            <div class="control">
              <button class="button is-info" :class="{ 'is-loading': is_loading }" @click="login" data-test="login-button">Login</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>