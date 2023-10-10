<script setup>
import { computed, onMounted, onUpdated, ref, watch } from "vue";
import ImageDisplay from "@/components/Image/ImageDisplay.vue";
import { Carousel, Slide, Pagination, Navigation } from 'vue3-carousel'
import { useHomePageStore } from "@/stores/home_page";

const page = ref({});
const content = computed(() => {
  return page.value.content;
});

const dive_carousel = ref(null)
const current_index = ref(0);
const current_photo = computed(() => {
  if (content.value.carousel_images.length > 0) {
    return content.value.carousel_images[current_index.value];
  }

  return {};
});
const show_carousel = computed(() => {
  return content.value?.carousel_images?.length > 1;
});

function handleSlideStart(data) {
  current_index.value = data.slidingToIndex;
}

onMounted(() => {
  useHomePageStore().getHomePage().then((home_page) => page.value = home_page);
});

</script>

<template>
<main>
  <div v-if="content">
    <figure>
      <img v-if="!content.hero_image" src="/hero_dive.jpg" alt="Sandals Montego Bay dive boat at dock">
      <ImageDisplay v-else :image="content.hero_image" size="full"/>
    </figure>
    <div class="container app_container">
      <div class="columns">
        <div class="column is-two-thirds">
          <div class="columns is-multiline">
            <div class="column is-full">
              <div class="card">
                <div class="card-content">
                  <p class="title" v-html="content.title"></p>
                  <div v-html="content.content"></div>
                </div>
              </div>
            </div>

            <div v-if="show_carousel" class="column is-half dive_carousel">
              <Carousel ref="dive_carousel" :items-to-show="1" @slide-start="handleSlideStart">
                <Slide v-for="carousel_image in content.carousel_images" :key="carousel_image.id">
                  <ImageDisplay :image="carousel_image" size="medium" />
                </Slide>

                <template #addons>
                  <Navigation />
                  <Pagination />
                </template>
              </Carousel>
            </div>
            <div v-if="show_carousel" class="column is-half">
              <div class="card">
                <div class="card-content">
                  <div v-html="content.image_description"></div>
                  <hr>
                  {{ current_photo.description }}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</main>
</template>

<style>
  p {
    &:not(:last-child)  {
      margin-bottom: 0.5rem;
    }
  }

  .dive_carousel .carousel__icon {
    fill: white;
  }

  html,body{ scroll-behavior: smooth}
</style>
