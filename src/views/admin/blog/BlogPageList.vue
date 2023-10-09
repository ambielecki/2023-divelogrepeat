<script setup>
import { computed, onMounted, ref } from "vue";
import PageProvider from "@/providers/PageProvider";

const blogs = ref([]);

onMounted(() => {
  PageProvider.getActiveBlogList()
      .then((response) => {
        blogs.value = response.blog_pages
      });
});
</script>

<template>
<div class="columns is-multiline">
  <div class="column is-full">
    <div class="card">
      <div class="card-content is-vcentered">
        <div class="columns">
          <div class="column is-four-fifths">
            <p class="title">Blog Entries</p>
          </div>
          <div class="column is-one-fifth">
            <router-link class="button is-info" :to="{ name: 'blog_create' }">Create</router-link>
          </div>
        </div>
      </div>
    </div>
  </div>

  <div v-for="blog in blogs" class="column is-full">
    <router-link :to="{ name: 'blog_edit', params: { id:blog.id }}">
      <div class="card blog_item">
        <div class="card-content">
          <p class="title is-4">{{ blog.title }}</p>
          <span v-html="blog.content.first_paragraph"></span>
        </div>
      </div>
    </router-link>
  </div>
</div>
</template>

<style scoped>
  .blog_item:hover {
    box-shadow: 0 0.75em 1.5em -0.250em #3e8ed0, 0 0 0 1px #0a0a0a05;
  }
</style>

