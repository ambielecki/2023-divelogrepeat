<script setup>
import { computed, ref } from "vue";
import GenericProvider from "@/providers/GenericProvider";
import { debounce } from "@/composables/debounce";

const props = defineProps(['input_label', 'input_name', 'input_placeholder', 'modelValue', 'search_uri']);
const emit = defineEmits(['update:modelValue']);

const internal_model = ref('');
const provider = new GenericProvider('/admin/tag');

const search = debounce(() => getSuggestions());
function getSuggestions() {
  if (internal_model.value.length > 2) {
    provider.getList({
      search: internal_model.value,
    })
        .then(results => {
          suggestions.value = results.tags;
        });
  } else {
    suggestions.value = [];
  }
}

const suggestions = ref([]);
const show_suggestions = computed(() => {
  return suggestions.value.length > 0;
})

const tags = ref([]);
const show_tags = computed(() => {
  return tags.value.length > 0;
})

function addTag(name) {
  if (tags.value.indexOf(name) === -1) {
    tags.value.push(name);
  }
  emit("update:modelValue", tags.value);
}

function removeTag(name) {
  const index = tags.value.indexOf(name);
  if (name !== -1) {
    tags.value.splice(index, 1);
  }
  emit("update:modelValue", tags.value);
}
</script>

<template>
<div>
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
              :placeholder="input_placeholder"
              v-model="internal_model"
              @keyup="search"
              @keyup.enter="addTag(internal_model)"
          >
        </div>
      </div>
    </div>
  </div>
  <div v-if="show_suggestions" class="field is-horizontal">
    <div class="field-label is-normal">
      <label class="label">Suggestions</label>
    </div>
    <div class="field-body">
      <div class="buttons">
        <button v-for="suggestion in suggestions" class="button is-small is-rounded" @click="addTag(suggestion.name)">
          <span>{{ suggestion.name }}</span>
              <span class="icon">
            <i class="fa-solid fa-plus"></i>
          </span>
        </button>
      </div>
    </div>
  </div>

  <div v-if="show_tags" class="field is-horizontal">
    <div class="field-label is-normal">
      <label class="label">Tags</label>
    </div>
    <div class="field-body">
      <div class="buttons">
        <button v-for="tag in tags" class="button is-small is-rounded" @click="removeTag(tag)">
          <span>{{ tag }}</span>
          <span class="icon">
            <i class="fa-solid fa-x"></i>
          </span>
        </button>
      </div>
    </div>
  </div>
</div>
</template>

<style scoped>
.tag_button:hover {
  cursor: pointer;
  background-color: grey;
}
</style>