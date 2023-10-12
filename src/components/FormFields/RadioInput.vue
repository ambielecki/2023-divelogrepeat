<script setup>
  const props = defineProps(['input_label', 'input_name', 'input_values', 'modelValue', 'is_stacked']);
  const emit = defineEmits(['update:modelValue', 'change']);

  function update() {
    emit('update:modelValue', event.target.value);
    emit('change');
  }
</script>

<template>
<div v-if="!is_stacked" class="field is-horizontal">
  <div class="field-label">
    <label class="label" :for="input_name">{{ input_label }}</label>
  </div>
  <div class="field-body">
    <div class="field is-narrow">
      <div class="control">
        <label v-for="(value, key) in input_values" class="radio">
          <input
              type="radio"
              :name="input_name"
              :value="value"
              :checked="value === modelValue"
              @input="update"
          >
          {{ key }}
        </label>
      </div>
    </div>
  </div>
</div>

<div v-else>
  <div class="field">
    <label class="label">{{ input_label }}</label>
    <div class="control">
      <label v-for="(value, key) in input_values" class="radio">
        <input
            type="radio"
            :name="input_name"
            :value="value"
            :checked="value === modelValue"
            @input="update"
        >
        {{ key }}
      </label>
    </div>
  </div>
</div>
</template>