<script setup>
import { computed, onMounted, ref } from "vue";
import { useUserStore } from "@/stores/user";

  const base_api = import.meta.env.VITE_API_URL;

  const file = ref(null);
  const alt_tag = ref('');
  const description = ref('');
  const is_hero = ref('0');

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

  function handleUpload() {
    const form_data = new FormData();
    form_data.append('image_file', file.value);
    form_data.append('alt_tag', alt_tag.value);
    form_data.append('description', description.value);
    form_data.append('is_hero', is_hero.value);

    fetch(base_api + '/admin/image', {
      headers: {
        "Accept": "application/json",
        "Authorization": "Bearer " + useUserStore().access_token
      },
      method: 'POST',
      body: form_data,
    })
        .then(response => {
          console.log(response);
        });
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

          <div class="field is-horizontal">
            <div class="field-label is-normal">
              <label class="label" for="alt_tag">Alt Tag</label>
            </div>

            <div class="field-body">
              <div class="field">
                <div class="control">
                  <input
                      class="input"
                      name="alt_tag"
                      type="text"
                      v-model="alt_tag"
                      placeholder="Description for alt tag"
                  >
                </div>
              </div>
            </div>
          </div>

          <div class="field is-horizontal">
            <div class="field-label is-normal">
              <label class="label" for="description">Description</label>
            </div>

            <div class="field-body">
              <div class="field">
                <div class="control">
                  <textarea class="textarea is-medium" name="description" v-model="description"></textarea>
                </div>
              </div>
            </div>
          </div>

          <div class="field is-horizontal">
            <div class="field-label">
              <label class="label" for="is_hero">Hero</label>
            </div>
            <div class="field-body">
              <div class="field is-narrow">
                <div class="control">
                  <label class="radio">
                    <input type="radio" name="is_hero" value="1" v-model="is_hero">
                    Yes
                  </label>
                  <label class="radio">
                    <input type="radio" name="is_hero" value="0" v-model="is_hero">
                    No
                  </label>
                </div>
              </div>
            </div>
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