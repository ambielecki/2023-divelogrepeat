<script setup>
  const props = defineProps(['input_label', 'input_name', 'modelValue']);
  const emit = defineEmits(['update:modelValue']);
  function update() {
    emit('update:modelValue', event.target.value);
  }

</script>

<template>
  <div class="field is-horizontal">
    <div class="field-label is-normal">
      <label class="label" for="description">{{ input_label }}</label>
    </div>
    <div class="field-body">
      <div class="field">
        <div class="control">
          <textarea
              class="textarea is-medium"
              :name="input_name"
              :value="modelValue"
              @input="update"
          ></textarea>
        </div>
      </div>
    </div>
  </div>
</template>