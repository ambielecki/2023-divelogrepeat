<script setup>
import { onMounted, ref } from "vue";
import ImageProvider from "@/providers/ImageProvider";
import RadioInput from "@/components/FormFields/RadioInput.vue";

const images = ref([]);
const get_hero_images = ref(0);
const get_hero_values = {
  Yes: 1,
  No: 0,
};

const sort = ref('created_at');
const sort_direction = ref('desc');
const limit = ref(20);
const page = ref(1);
const pages = ref(0);

const is_loading = ref(false);

async function getImageList() {
  is_loading.value = true;
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

  return true;
}

  onMounted(() => {
    is_loading.value = true;
    getImageList();
  });
</script>

<template>
  <div class="card">
    <div class="card-content">
      <RadioInput
        input_name="hero_images"
        input_label="Hero"
        :input_values="get_hero_values"
        v-model="get_hero_images"
      />
    </div>
  </div>
</template>