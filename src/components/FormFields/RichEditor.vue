<script setup>
  // import CKEditor from '@ckeditor/ckeditor5-vue';
  import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
  import { onMounted, ref } from "vue";

  const props = defineProps(['input_label', 'input_name', 'modelValue']);
  const emit = defineEmits(['update:modelValue']);

  const editor = ClassicEditor;
  const config = {};
  const text = ref('');

  onMounted(() => {
    text.value = JSON.parse(JSON.stringify(props.modelValue));
  });

  function update() {
    emit('update:modelValue', text.value);
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
        <ckeditor :editor="editor" v-model="text" :config="config" @input="update"/>
      </div>
    </div>
  </div>
</div>
</template>
<style>
  .ck.ck-editor {
    max-width: 35rem;
    @media screen and (max-width: 1250px) {
      max-width: 25rem;
    }

    @media screenand (max-width: 900px) {
      max-width: 20rem;
    }
  }
  .ck-editor__editable_inline {
    min-height: 15rem;
  }
</style>