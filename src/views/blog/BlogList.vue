<script setup>
import { onMounted, ref } from "vue";
import PageProvider from "@/providers/PageProvider";
import BlogListItem from "@/components/Blog/BlogListItem.vue";
import Pagination from "@/components/Pagination.vue";
import { useBlogStore } from "@/stores/blog";
import { useRoute } from "vue-router";

const route = useRoute();

const blogs = ref([]);
const active_blog = ref({});

const page = ref(parseInt(route.query.start_page ?? '1'));
const pages = ref(0);

const is_list_loading = ref(true);
const is_active_loading = ref(true);
const show_pagination = ref(false);

onMounted(() => {
  getBlogs().then(() => {
    if (blogs.value.length > 1) {
      show_pagination.value = true;
    }
  });

  getMostRecentBlog();
});

function handlePaginationNavigate(navigate_to) {
  page.value = navigate_to;
  getBlogs();
}

async function getBlogs() {
  is_list_loading.value = true;

  PageProvider.getPublishedBlogList({
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

async function getMostRecentBlog() {
  is_active_loading.value = true;
  useBlogStore().getMostRecentBlog()
      .then((blog_result) => {
        active_blog.value = blog_result;
        is_active_loading.value = false;
      });
}

</script>

<template>
<div class="columns blog_page">
  <div class="column is-8-tablet is-hidden-mobile">
    <div v-if="!is_active_loading" class="card">
      <div class="card-content">
        <p class="title is-4">{{ active_blog.title }}</p>
        <p class="subtitle is-6">{{ $filters.formatDateOnly(active_blog.created_at) }}</p>
        <div v-html="active_blog.content?.content_with_images" class="content_container"></div>
      </div>
    </div>
  </div>

  <div class="column is-4 is-multiline">
    <BlogListItem
        v-for="blog in blogs"
        :blog="blog"
        :show_image="false"
        :is_selected="blog.id === active_blog.id"
        :from_page="page"
    />
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