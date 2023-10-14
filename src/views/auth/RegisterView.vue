<script setup>
import { useUserStore } from "../../stores/user";
import { useAlertStore } from "../../stores/alert";
import { ref, computed } from 'vue';
import AuthProvider from "../../providers/AuthProvider";
import validationProvider from "../../providers/ValidationProvider";
import router from "../../router";
import TextInput from "@/components/FormFields/TextInput.vue";

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
        <TextInput
            input_label="First Name"
            input_name="first_name"
            v-model="first_name"
            :errors="errors.first_name"
            input_placeholder="First Name"
            type="text"
            is_stacked="true"
            @enter="register"
        />

        <TextInput
            input_label="Last Name"
            input_name="last_name"
            v-model="first_name"
            :errors="errors.last_name"
            input_placeholder="Last Name"
            type="text"
            is_stacked="true"
            @enter="register"
        />

        <TextInput
            input_label="Email"
            input_name="email"
            v-model="email"
            :errors="errors.email"
            input_placeholder="Email Address"
            type="text"
            is_stacked="true"
            @enter="register"
        />

        <TextInput
            input_label="Password"
            input_name="password"
            v-model="password"
            :errors="errors.password"
            input_placeholder="Password"
            type="password"
            is_stacked="true"
            @enter="register"
        />

        <TextInput
            input_label="Confirm Password"
            input_name="password_confirmation"
            v-model="password_confirmation"
            input_placeholder="Confirm Password"
            type="password"
            is_stacked="true"
            @enter="register"
        />

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