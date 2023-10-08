<script setup>
import { computed, onMounted, ref } from "vue";
import PageProvider from "@/providers/PageProvider";
import TextInput from "@/components/FormFields/TextInput.vue";
import RichEditor from "@/components/FormFields/RichEditor.vue";
import ImageSelector from "@/components/Image/ImageSelector.vue";
import { useAlertStore } from "@/stores/alert";
import { useHomePageStore } from "@/stores/home_page";
import router from "@/router";
import ImageDisplay from "@/components/Image/ImageDisplay.vue";

const page = ref({});

async function handleSave() {
  const response = await PageProvider.postHomePage({
    page: {
      content: {
        content: page.value.content.content,
        image_description: page.value.content.image_description,
        title: page.value.content.title,
      },
    },
    hero_image: has_hero_image ? hero_image.value.id : null,
    carousel_images: carousel_image_ids.value,
  });

  if (response) {
    useAlertStore().addAlert('Home page updated successfully');
    useHomePageStore().setHomePage(response.home_page);
    router.push({name: 'home'});
  }
}

const hero_image = ref({});
const has_hero_image = computed(() => {
  return Object.keys(hero_image.value).length > 0;
});

function removeHeroImage() {
  hero_image.value = {};
}

const carousel_images = ref([]);
const has_carousel_images = computed(() => {
  return carousel_images.value.length > 0;
});
const carousel_image_ids = computed(() => {
  return carousel_images.value.map((image) => image.id);
});

function removeCarouselImage(id) {
  carousel_images.value = carousel_images.value.filter((image) => {
    return image.id !== id;
  })
}

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

const is_image_selector_collapsed = ref(false);
function toggleImageSelector() {
  is_image_selector_collapsed.value = !is_image_selector_collapsed.value;
}

onMounted(() => {
  PageProvider.getHomePage()
      .then((results) => {
        if (results.home_page) {
          results.home_page.content.image_description = results.home_page.content.image_description ?? '';
          page.value = results.home_page;
          hero_image.value = results.home_page.content.hero_image ?? {};
          carousel_images.value = results.home_page.content.carousel_images ?? [];
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

          <RichEditor
              v-model="page.content.image_description"
              input_name="image_description"
              input_label="Image Description"
          />

          <p v-if="has_hero_image" class="title is-4">Hero Image</p>
          <div v-if="has_hero_image" class="columns is-multiline">
            <div class="image_container">
              <ImageDisplay :image="hero_image" size="small" />
              <button class="delete is-medium image_delete" @click="removeHeroImage"></button>
            </div>
          </div>

          <p v-if="has_carousel_images" class="title is-4">Carousel Images</p>
          <div v-if="has_carousel_images" class="columns is-multiline">
            <div v-for="carousel_image in carousel_images" class="column is-one-fifth">
              <div class="image_container">
                <ImageDisplay :image="carousel_image" size="small" />
                <button class="delete is-medium image_delete" @click="removeCarouselImage(carousel_image.id)"></button>
              </div>
            </div>
          </div>

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
      <ImageSelector
          :show_select="true"
          :is_collapsed="is_image_selector_collapsed"
          @selected="handleImageSelect"
          @toggle="toggleImageSelector"
      />
    </div>
  </div>
</template>

<style scoped>
.image_container {
  position: relative;
}

.image_delete {
  position: absolute;
  right: 0.25rem;
  top: 0.25rem;
}
</style>