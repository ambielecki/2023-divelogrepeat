<script setup>
import { computed, onMounted, ref } from "vue";
import ImageProvider from "@/providers/ImageProvider";
import RadioInput from "@/components/FormFields/RadioInput.vue";
import Pagination from "@/components/Pagination.vue";
import ImageDetails from "@/components/Image/ImageDetails.vue";

const props = defineProps(['show_select', 'show_code'])
const emit = defineEmits(['selected']);

function handleSelect() {
  if (has_selected_image.value) {
    emit('selected', selected_image.value, show_hero.value);
  }
}

const base_image_path = import.meta.env.VITE_IMAGE_URL;

const images = ref([]);
const get_hero_images = ref('0');
const get_hero_values = {
  Yes: '1',
  No: '0',
};

const selected_image = ref({});
const has_selected_image = computed(() => {
  return Object.keys(selected_image.value).length > 0;
});

function imageClick(image) {
  selected_image.value = image;
}

const sort = ref('created_at');
const sort_direction = ref('desc');
const limit = ref(20);
const page = ref(1);
const pages = ref(0);

const is_loading = ref(false);
const show_pagination = ref(false);

const show_hero = computed(() => {
  return get_hero_images.value === '1';
});

async function getImageList() {
  is_loading.value = true;
  selected_image.value = {};
  const results = await ImageProvider.getList({
    sort: sort.value,
    sort_direction: sort_direction.value,
    page: page.value,
    limit: limit.value,
    get_hero: get_hero_images.value,
  });
  if (results) {
    images.value = results.images;
    page.value = parseInt(results.page);
    pages.value = parseInt(results.pages);
    limit.value = parseInt(results.limit);
  }

  is_loading.value = false;
  show_pagination.value = true;

  return true;
}

function handlePaginationNavigate(navigate_to) {
  page.value = navigate_to;
  getImageList();
}

onMounted(() => {
  is_loading.value = true;
  getImageList();
});
</script>

<template>
<div class="columns is-multiline">
  <div class="column is-full">
    <div class="card">
      <div class="card-content">
        <p class="title">Select Images </p>
        <RadioInput
            input_name="hero_images"
            input_label="Hero"
            :input_values="get_hero_values"
            v-model="get_hero_images"
            @change="getImageList"
        />
        <div class="columns is-multiline is-mobile">
          <div v-if="!is_loading" v-for="image in images" :class="[show_hero ? 'is-half' : 'is-one-third', 'column']">
            <div class="card image_item">
              <div class="card-image">
                <figure class="image" @click="imageClick(image)">
                  <img v-if="image.has_sizes" :src="base_image_path + image.public_path + '/small/' + image.file_name"
                       :alt="image.alt_tag">
                  <img v-else :src="base_image_path + image.public_path + '/' + image.file_name" :alt="image.alt_tag">
                </figure>
              </div>
            </div>
          </div>
        </div>

        <div v-if="show_pagination" class="columns">
          <div class="column">
            <Pagination :current_page="page" :pages="pages" route="image_list"
                        @paginationNavigate="handlePaginationNavigate"/>
          </div>
        </div>
      </div>
    </div>
  </div>

  <div v-if="has_selected_image" class="column is-full">
    <div class="card">
      <div class="card-image">
        <figure class="image">
          <img :src="base_image_path + selected_image.public_path + '/' + selected_image.file_name" :alt="selected_image.alt_tag">
        </figure>
      </div>
      <div class="card-content">
        <div v-if="show_select" class="field is-grouped">
          <p class="control">
            <button class="button is-info" @click="handleSelect">Select</button>
          </p>
        </div>
        <ImageDetails v-if="has_selected_image" :image="selected_image" :show_edit="false" />
      </div>
    </div>
  </div>
</div>
</template>

<style scoped>
.image_item:hover {
  box-shadow: 0 0.75em 1.5em -0.250em #3e8ed0, 0 0 0 1px #0a0a0a05;
}
</style>