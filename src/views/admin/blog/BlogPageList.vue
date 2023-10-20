<script setup>
import { computed, onMounted, ref } from "vue";
import PageProvider from "@/providers/PageProvider";
import Pagination from "@/components/Pagination.vue";

const blogs = ref([]);
const show_pagination = ref(false);
const is_list_loading = ref(false);
const page = ref(1);
const pages = ref(0);
const limit = 10;

onMounted(() => {
  getBlogs().then(() => {
    if (blogs.value.length > 1) {
      show_pagination.value = true;
    }
  });
});

function handlePaginationNavigate(navigate_to) {
  page.value = navigate_to;
  getBlogs();
}

async function getBlogs() {
  is_list_loading.value = true;

  PageProvider.getActiveBlogList({
    page: page.value,
  })
      .then((results) => {
        if (results) {
          page.value = parseInt(results.page);
          pages.value = parseInt(results.pages);
          blogs.value = results.blog_pages;
        }

        is_list_loading.value = false;
        show_pagination.value = true;
        window.scrollTo(0,0);
      });
}

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
      <div :class="{card: true, blog_item: true, not_published: !blog.is_published}">
        <div class="card-content">
          <p class="title is-4">{{ blog.title }}</p>
          <p class="subtitle is-6">{{ $filters.formatDateOnly(blog.created_at) }}</p>
          <span v-html="blog.content.first_paragraph"></span>
        </div>
      </div>
    </router-link>
  </div>

  <div v-if="show_pagination" class="columns">
    <div class="column">
      <Pagination :current_page="page" :pages="pages" @paginationNavigate="handlePaginationNavigate"/>
    </div>
  </div>
</div>
</template>

<style scoped>
  .blog_item:hover {
    box-shadow: 0 0.75em 1.5em -0.250em #3e8ed0, 0 0 0 1px #0a0a0a05;
  }

  .not_published {
    background-color: lightgrey;
  }
</style>

