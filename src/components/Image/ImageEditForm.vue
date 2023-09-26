<script setup>
import TextInput from "@/components/FormFields/TextInput.vue";
import { onMounted, ref } from "vue";
import TextAreaInput from "@/components/FormFields/TextAreaInput.vue";
import RadioInput from "@/components/FormFields/RadioInput.vue";
import TagInput from "@/components/FormFields/TagInput.vue";

const props = defineProps(['image']);
const emit = defineEmits(['cancel', 'save']);

const hero_values = {
  Yes: 1,
  No: 0,
}

const edit_image = ref({});

onMounted(() => {
  edit_image.value = JSON.parse(JSON.stringify(props.image));
});

function handleSave() {
  emit('save', edit_image.value, edit_image.value.tag_names);
}

function handleCancel() {
  emit('cancel');
}

</script>

<template>
<div class="content">
  <TextInput
    input_name="alt_tag"
    input_label="Alt Tag"
    input_placeholder="Description for alt tag"
    v-model="edit_image.alt_tag"
  />
  <TextAreaInput
      input_label="Description"
      input_name="description"
      v-model="edit_image.description"
  >
  </TextAreaInput>
  <RadioInput
      input_name="is_hero"
      input_label="Hero"
      :input_values="hero_values"
      v-model="edit_image.is_hero"
  />
  <div class="field">
    <TagInput
        input_name="tags"
        input_label="Edit Tag"
        input_placeholder="Edit Tags"
        search_uri="/admin/tag"
        v-model="edit_image.tag_names"
    />
  </div>
  <div class="field is-grouped">
    <p class="control"><button class="button is-info" @click="handleSave">Save</button></p>
    <p class="control"><button class="button is-info" @click="handleCancel">Cancel</button></p>
  </div>

</div>
</template>