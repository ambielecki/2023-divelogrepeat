<script setup>
import { computed, ref } from "vue";
import { useAlertStore } from "@/stores/alert";
import ImageProvider from "@/providers/ImageProvider";
import router from "@/router";
import TextInput from "@/components/FormFields/TextInput.vue";
import RadioInput from "@/components/FormFields/RadioInput.vue";
import TextAreaInput from "@/components/FormFields/TextAreaInput.vue";
import TagInput from "@/components/FormFields/TagInput.vue";

const is_loading = ref(false);

const file = ref(null);
const alt_tag = ref('');
const description = ref('');
const is_hero = ref(0);
const tags = ref([]);
const hero_values = {
  Yes: 1,
  No: 0,
}

const file_name = computed(() => {
  if (file.value) {
    return file.value.name;
  }

  return "No file selected..."
});

function handleFileChange($event) {
  const target = $event.target;
  if (target && target.files) {
    file.value = target.files[0];
  }

  buildImagePreview();
}

function buildImagePreview() {
  const imagePreview = document.getElementById("image_preview");

  const reader = new FileReader();
  reader.addEventListener('load', function () {
    imagePreview.src = reader.result;
  });

  if (file.value.type === "image/jpeg" || file.value.type === "image/jpg" || file.value.type === "image/gif" || file.value.type === "image/png") {
    reader.readAsDataURL(file.value);
  }
}

async function handleUpload() {
  is_loading.value = true;
  const form_data = new FormData();
  form_data.append('image_file', file.value);
  form_data.append('alt_tag', alt_tag.value);
  form_data.append('description', description.value);
  form_data.append('is_hero', is_hero.value);
  form_data.append('tags', tags.value);

  const response = await ImageProvider.postImage(form_data);

  if (response) {
    useAlertStore().addAlert('Image uploaded successfully');
    router.push({name: 'image_list'});
  }

  is_loading.value = false;
}
</script>

<template>
<div class="columns">
  <div class="column is-half">
    <div class="card">
      <div class="card-content">
        <p class="title">Image</p>
        <div class="columns is-multiline">
          <div class="column is-full">
            <div class="file has-name is-fullwidth">
              <label class="file-label">
                <input class="file-input" type="file" name="resume" @change="handleFileChange($event)">
                <span class="file-cta">
                <span class="file-icon">
                  <i class="fas fa-upload"></i>
                </span>
                <span class="file-label">
                  Choose a file…
                </span>
              </span>
                <span class="file-name">
                {{ file_name }}
              </span>
              </label>
            </div>
          </div>
        </div>
      </div>
      <div class="card-image">
        <figure class="image">
          <img id="image_preview">
        </figure>
      </div>
    </div>
  </div>

  <div class="column is-half">
    <div class="card">
      <div class="card-content">
        <p class="title">Image Details</p>

        <TextInput
            input_name="alt_tag"
            input_label="Alt Tag"
            input_placeholder="Description for alt tag"
            v-model="alt_tag"
        />
        <TextAreaInput
            input_label="Description"
            input_name="description"
            v-model="description"
        >
        </TextAreaInput>
        <RadioInput
            input_name="is_hero"
            input_label="Hero"
            :input_values="hero_values"
            v-model="is_hero"
        />
        <div class="field">
          <TagInput
              input_name="tags"
              input_label="Add Tag"
              input_placeholder="Add Tags"
              search_uri="/admin/tag"
              v-model="tags"
          />
        </div>

        <div class="field is-horizontal">
          <div class="field-label is-normal">
            <label class="label"></label>
          </div>
          <div class="control">
            <button class="button is-info" @click="handleUpload">Upload</button>
          </div>
        </div>

      </div>
    </div>
  </div>

</div>
</template>