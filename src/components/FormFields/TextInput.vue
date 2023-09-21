<script setup>
  const props = defineProps(['input_label', 'input_name', 'input_placeholder', 'modelValue']);
  const emit = defineEmits(['update:modelValue']);

  function update() {
    emit('update:modelValue', event.target.value);
  }
</script>

<template>
  <div class="field is-horizontal">
    <div class="field-label is-normal">
      <label class="label" :for="input_name">{{ input_label }}</label>
    </div>

    <div class="field-body">
      <div class="field">
        <div class="control">
          <input
              class="input"
              :name="input_name"
              type="text"
              :value="modelValue"
              :placeholder="input_placeholder"
              @input="update"
          >
        </div>
      </div>
    </div>
  </div>
</template>