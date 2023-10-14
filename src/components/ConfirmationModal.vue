<script setup>
import { computed } from "vue";

const emit = defineEmits(['close', 'confirm']);
const props = defineProps(['message', 'confirm_text', 'is_active']);

const modal_class = computed(() => {
  return {
    modal: true,
    'is-active': props.is_active,
  }
});
</script>

<template>
<div :class="modal_class">
  <div class="modal-background"></div>
  <div class="modal-content">
    <div class="card">
      <div class="card-content">
        <div class="content">
          {{ message }}
        </div>
        <div class="field is-grouped">
          <p class="control">
            <button class="button is-danger" @click="$emit('confirm')">{{ confirm_text }}</button>
          </p>
          <p class="control">
            <button class="button" aria-label="close" @click="$emit('close')">Cancel</button>
          </p>
        </div>
      </div>
    </div>
  </div>
</div>
</template>