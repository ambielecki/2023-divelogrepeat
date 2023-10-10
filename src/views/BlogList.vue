<script setup>
import { computed, onMounted, ref } from "vue";
import PageProvider from "@/providers/PageProvider";
import ImageDisplay from "@/components/Image/ImageDisplay.vue";
import BlogListItem from "@/components/Blog/BlogListItem.vue";
import Pagination from "@/components/Pagination.vue";

const blogs = ref([]);
const active_blog = ref({});

const page = ref(1);
const pages = ref(0);

const is_loading = ref(true);
const show_pagination = ref(false);

onMounted(() => {
  getBlogs().then(() => {
    if (blogs.value.length > 1) {
      active_blog.value = blogs.value[0];
      show_pagination.value = true;
    }
  })
});

function handlePaginationNavigate(navigate_to) {
  page.value = navigate_to;
  getBlogs();
}

async function getBlogs() {
  is_loading.value = true;
  const results = await PageProvider.getActiveBlogList({
    page: page.value,
  });

  if (results) {
    page.value = parseInt(results.page);
    pages.value = parseInt(results.pages);
    blogs.value = results.blog_pages;
  }

  is_loading.value = false;
  window.scrollTo(0,0);

  return true;
}
</script>

<template>
<div class="columns blog_page">
  <div class="column is-8-tablet is-hidden-mobile">
    <div v-if="active_blog" class="card">
      <div class="card-content">
        <p class="title is-4">{{ active_blog.title }}</p>
        <div v-html="active_blog.content?.content_with_images" class="content_container"></div>
      </div>
    </div>
  </div>

  <div class="column is-4 is-multiline">
    <BlogListItem v-for="blog in blogs" :blog="blog" :show_image="false" :is_selected="blog.id === active_blog.id"/>
    <div v-if="show_pagination" class="columns">
      <div class="column">
        <Pagination :current_page="page" :pages="pages" route="blog_list" @paginationNavigate="handlePaginationNavigate"/>
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

.blog_page .column .card-content button {
  margin-top: 1rem;
}
</style>