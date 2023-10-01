<script setup>
import { computed, onMounted, ref } from "vue";
  import PageProvider from "../providers/PageProvider";

  const page = ref({});
  const content = computed(() => {
    return page.value.content;
  });

  onMounted(() => {
    PageProvider.getHomePage()
        .then((results) => {
          page.value = results.home_page;
        });
  });
</script>

<template>
  <main>
    <div v-if="content">
      <figure v-if="!content.hero_image">
        <img src="/hero_dive.jpg" alt="Sandals Montego Bay dive boat at dock">
      </figure>
      <div class="container app_container">
        <div v-html="content.content"></div>
      </div>
    </div>
  </main>
</template>
