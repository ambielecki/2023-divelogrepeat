<script setup>
import { computed, ref } from "vue";
import TextInput from "@/components/FormFields/TextInput.vue";
import validationProvider from "@/providers/ValidationProvider";
import AuthProvider from "@/providers/AuthProvider";
import { useAlertStore } from "@/stores/alert";
import router from "@/router";

const email = ref('');
const errors = ref({
  email: [],
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

function validateForm() {
  errors.value = {
    email: [],
  }

  if (!email.value) {
    errors.value.email.push('Email is required.');
  }

  if (!validationProvider.validateEmail(email.value)) {
    errors.value.email.push('Must be a valid email.');
  }
}

const is_loading = ref(false);
async function resetPassword() {
  is_loading.value = true;

  validateForm();

  if (has_errors.value) {
    is_loading.value = false;
    return
  }

  const response = await AuthProvider.requestPasswordReset({
    email: email.value,
  });

  if (response) {
    useAlertStore().addAlert('Password Reset Requested, Please Check Your Email');
    router.push({ name: 'home' });
  }

  is_loading.value = false;
}
</script>

<template>
<div class="columns is-centered">
  <div class="column is-half">
    <div class="card">
      <div class="card-content">
        <p class="title is-4">Request Password Reset</p>
          <TextInput
              input_label="Email"
              input_name="email"
              v-model="email"
              input_placeholder="Email Address"
              :errors="errors.email"
          />

          <div class="field is-grouped is-horizontal">
            <div class="field-label is-normal"></div>
            <div class="field-body">
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
</div>
</template>