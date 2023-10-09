<script setup>
import { computed, onMounted, ref } from "vue";
import PageProvider from "@/providers/PageProvider";

const blogs = ref([]);
const active_blog = ref({});

onMounted(() => {
  getBlogs().then(() => {
    if (blogs.value.length > 1) {
      active_blog.value = blogs.value[0];
    }
  })
});

async function getBlogs() {
  const response = await PageProvider.getActiveBlogList();
  blogs.value = response.blog_pages;
}
</script>

<template>
<div class="columns blog_page">
  <div class="column is-three-fifths">
    <div v-if="active_blog" class="card">
      <div class="card-content">
        <p class="title is-4">{{ active_blog.title }}</p>
        <div v-html="active_blog.content?.content_with_images" class="content_container"></div>
      </div>
    </div>
  </div>
</div>
</template>

<style>
.blog_page .content_container {
  display: grid;
}
.blog_page .content_container img {
  margin: 0.5rem 0 1rem 0;
  width: 100%;
}
</style>