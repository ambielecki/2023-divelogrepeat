<script setup>
import { computed, onMounted, ref } from "vue";
import PageProvider from "@/providers/PageProvider";
import TextInput from "@/components/FormFields/TextInput.vue";
import RichEditor from "@/components/FormFields/RichEditor.vue";
import ImageSelector from "@/components/Image/ImageSelector.vue";

const page = ref({});

function handleSave() {
  console.log('TODO');
}

const hero_image = ref({});
const has_hero_image = computed(() => {
  return Object.keys(hero_image.value).length > 0;
});

const carousel_images = ref([]);
const has_carousel_images = computed(() => {
  return carousel_images.value.length > 0;
});

function handleImageSelect(image, is_hero) {
  const cloned_image = JSON.parse(JSON.stringify(image));

  if (is_hero) {
    hero_image.value = cloned_image;
  } else {
    if (!carousel_images.value.find((carousel_image) => carousel_image.id === cloned_image.id)) {
      carousel_images.value.push(cloned_image);
    }
  }
}

onMounted(() => {
  PageProvider.getHomePage()
      .then((results) => {
        if (results.home_page) {
          page.value = results.home_page;
        }
      });
});
</script>

<template>
  <div class="columns">
    <div v-if="page.content" class="column is-three-fifths">
      <div class="card">
        <div class="card-content">

          <p class="title is-4">Home Page Revision: {{ page.revision }}</p>
          <div class="field is-horizontal">
            <div class="field-label is-normal">
              <label class="label">Updated</label>
            </div>
            <div class="field-body">
              <div class="field">
                <div class="control">
                  {{ page.updated_at }}
                </div>
              </div>
            </div>
          </div>
          <TextInput
              input_label="Title"
              input_name="title"
              input_placeholder="Title"
              v-model="page.content.title"
          />

          <RichEditor
            v-model="page.content.content"
            input_name="content"
            input_label="Content"
          />

          <div class="field is-horizontal">
            <div class="field-label is-normal">
              <label class="label"></label>
            </div>
            <div class="control">
              <button class="button is-info" @click="handleSave">Save</button>
            </div>
          </div>

        </div>
      </div>
    </div>
    <div v-else class="column is-three-fifths"></div>

    <div class="column is-two-fifths">
      <ImageSelector :show_select="true" @selected="handleImageSelect"/>
    </div>
  </div>
</template>