<script setup>
import { computed, onMounted, onUpdated, ref, watch } from "vue";
import PageProvider from "../providers/PageProvider";
import ImageDisplay from "@/components/Image/ImageDisplay.vue";
import { Carousel, Slide, Pagination, Navigation } from 'vue3-carousel'

const page = ref({});
const content = computed(() => {
  return page.value.content;
});

const show_carousel = computed(() => {
  return content.value?.carousel_images?.length > 1;
});

const carousel = ref(null);

onMounted(() => {
  PageProvider.getHomePage()
      .then((results) => {
        page.value = results.home_page;
      });
});

onUpdated(() => {
  if (show_carousel.value) {

  }
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

            <div v-if="show_carousel" class="column is-half">
              <Carousel :items-to-show="1">
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
                  <p>I would never claim to be a professional, but I do love taking photos.</p><br>
                  <p>Lately I have been using a <a href="https://www.sealife-cameras.com/product/micro-3-0-underwater-camera/">
                    Sealife Micro 3.0
                  </a> for my underwater photos. It suits my needs well, not having to mess with o-rings is great
                  and the ability to take RAW format photos allows for decent editing.</p>
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
