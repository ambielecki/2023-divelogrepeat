<script setup>
import { useUserStore } from "../../stores/user";
import { useAlertStore } from "../../stores/alert";
import { ref, computed } from 'vue';
import AuthProvider from "../../providers/AuthProvider";
import validationProvider from "../../providers/ValidationProvider";
import router from "../../router";

const userStore = useUserStore();
const first_name = ref('');
const last_name = ref('');
const password = ref('');
const password_confirmation = ref('');
const email = ref('');
const errors = ref({
  first_name: [],
  last_name: [],
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

const hide_register = ref(userStore.is_logged_in);
const is_loading = ref(false);

async function register() {
  is_loading.value = true;
  hide_register.value = false;
  validateForm();

  if (has_errors.value) {
    is_loading.value = false;
    return
  }

  const response = await AuthProvider.register({
    first_name: first_name.value,
    last_name: last_name.value,
    email: email.value,
    password: password.value,
    password_confirmation: password_confirmation.value,
  });

  if (response) {
    userStore.access_token = response.access_token;

    const user = response.user;
    if (user) {
      userStore.$patch({
        user: user,
        is_logged_in: true,
      });

      useAlertStore().addAlert('Successfully Registered, Welcome!');

      router.push({name: 'home'});
    }
  }

  is_loading.value = false;
}

function validateForm() {
  errors.value = {
    first_name: [],
    last_name: [],
    email: [],
    password: [],
  };

  if (!first_name.value) {
    errors.value.first_name.push('First name is required.');
  }

  if (!last_name.value) {
    errors.value.last_name.push('Last name is required.');
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

  if (!validationProvider.validateMinLength(password.value, 8)) {
    errors.value.password.push('Password must be at least 8 characters.');
  }

  if (!validationProvider.validateMatch(password.value, password_confirmation.value)) {
    errors.value.password.push('Passwords must match.');
  }
}
</script>

<template>
<div v-if="hide_register">
  You have already registered and are logged in.
</div>
<div v-else class="columns is-centered">
  <div class="column is-half">
    <div class="card">
      <div class="card-content">
        <p class="title is-4">Register</p>
        <div class="field">
          <label class="label" for="first_name">First Name</label>
          <div class="control">
            <input
                id="first_name"
                class="input"
                type="text"
                placeholder="First Name"
                v-model="first_name"
                @keyup.enter="register"
            >
          </div>
          <div>
            <p class="help is-danger" v-for="(error, index) in errors.first_name ">
              {{ error }}
            </p>
          </div>
        </div>

        <div class="field">
          <label class="label" for="last_name">Last Name</label>
          <div class="control">
            <input
                id="last_name"
                class="input"
                type="text"
                placeholder="Last Name"
                v-model="last_name"
                @keyup.enter="register"
            >
          </div>
          <div>
            <p class="help is-danger" v-for="(error, index) in errors.last_name ">
              {{ error }}
            </p>
          </div>
        </div>

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
          <div>
            <p class="help is-danger" v-for="(error, index) in errors.email ">
              {{ error }}
            </p>
          </div>
        </div>

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
          <p class="help is-danger" v-for="(error, index) in errors.password ">
            {{ error }}
          </p>
        </div>

        <div class="field">
          <label class="label" for="password_confirmation">Confirm Password</label>
          <div class="control">
            <input
                id="password_confirmation"
                class="input"
                type="password"
                placeholder="Confirm Password"
                v-model="password_confirmation"
                @keyup.enter="register"
            >
          </div>
        </div>

        <div class="field is-grouped">
          <div class="control">
            <button class="button is-info" :class="{ 'is-loading': is_loading }" @click="register"
                    data-test="login-button">Sign Up
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>
</template>