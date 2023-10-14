<script setup>
import TextInput from "@/components/FormFields/TextInput.vue";
import { computed, ref } from "vue";
import { useRoute } from "vue-router";
import validationProvider from "@/providers/ValidationProvider";
import AuthProvider from "@/providers/AuthProvider";
import { useAlertStore } from "@/stores/alert";
import router from "@/router";

const password = ref('');
const password_confirmation = ref('');
const route = useRoute();

const token = route.query.token ?? '';
const email = route.query.email ?? '';
const errors = ref({
  password: '',
});

const has_errors = computed(() => {
  let return_value = false;
  for (const field in errors.value) {
    if (errors.value[field].length > 0) {
      return_value = true;
      break;
    }
  }

  return return_value;
});

async function resetPassword() {
  is_loading.value = true;

  validateForm();

  if (has_errors.value) {
    is_loading.value = false;
    return
  }

  const response = await AuthProvider.resetPassword({
    email: email,
    token: token,
    password: password.value,
    password_confirmation: password_confirmation.value,
  });

  if (response) {
    useAlertStore().addAlert('Password Reset Successfully');
    router.push({ name: 'home' });
  }

  is_loading.value = false;
}

const is_loading = ref(false);
function validateForm() {
  errors.value = {
    password: [],
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
<div class="columns is-centered">
  <div class="column is-half">
    <div class="card">
      <div class="card-content">
        <p class="title is-4">Reset Password</p>
        <TextInput
            input_label="New Password"
            input_name="password"
            v-model="password"
            input_placeholder="Password"
            :errors="errors.password"
            type="password"
            is_stacked="true"
            @enter="resetPassword"
        />

        <TextInput
            input_label="Confirm New Password"
            input_name="password_confirm"
            v-model="password_confirmation"
            input_placeholder="Password"
            type="password"
            is_stacked="true"
            @enter="resetPassword"
        />

        <div class="field is-grouped">
          <div class="control">
            <button
                class="button is-info"
                :class="{ 'is-loading': is_loading }"
                @click="resetPassword"
                data-test="login-button"
            >Submit</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>
</template>