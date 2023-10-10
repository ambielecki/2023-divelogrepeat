<script setup>
import { computed, onMounted, ref } from "vue";
import PageProvider from "@/providers/PageProvider";
import { useRoute } from "vue-router";

const route = useRoute();
const blog = ref({});
const from_page = computed(() => {
  return route.query.from_page ?? '1';
})

onMounted(() => {
  PageProvider.getBlogItem(route.params.slug)
      .then((results) => {
        blog.value = results.blog_page;
      });
})
</script>

<template>
<div class="columns blog_page is-centered">
  <div class="column is-8">
    <div class="card">
      <div class="card-content">
        <p class="title is-4">{{ blog.title }}</p>
        <div v-html="blog.content?.content_with_images" class="content_container"></div>
        <router-link :to="{ name: 'blog_list', query: { start_page: from_page }}">
          <button class="button is-info view_more_button">Go to All Blog Entries</button>
        </router-link>
      </div>
    </div>
  </div>
</div>
</template>