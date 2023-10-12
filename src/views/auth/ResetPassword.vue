<script setup>
import TextInput from "@/components/FormFields/TextInput.vue";
import { computed, ref } from "vue";

const password = ref('');
const password_confirm = ref('');
const errors = ref({
  password: '',
  password_confirm: "",
});

function resetPassword() {

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
        />

        <TextInput
            input_label="Confirm New Password"
            input_name="password_confirm"
            v-model="password_confirm"
            input_placeholder="Password"
            type="password"
            is_stacked="true"
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