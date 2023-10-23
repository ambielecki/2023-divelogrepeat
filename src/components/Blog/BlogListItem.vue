<script setup>
import ImageDisplay from "@/components/Image/ImageDisplay.vue";
import { computed } from "vue";

const props = defineProps(['blog', 'show_image','is_selected', 'go_to_blog_list', 'from_page']);
const card_class = computed(() => {
  return {
    'card blog-preview' : true,
    'is_selected': props.is_selected,
  }
});

</script>

<template>
  <div :class="card_class">
    <div v-if="show_image && blog.content?.images && blog?.content?.images?.length > 0" class="card-image">
      <figure class="image">
        <ImageDisplay :image="blog.content.images[0]" size="medium"></ImageDisplay>
      </figure>
    </div>

    <div class="card-content">
      <p class="title is-5">{{ blog.title }}</p>
      <p class="subtitle is-6">{{ $filters.formatDateOnly(blog.created_at) }}</p>
      <div v-html="blog.content?.first_paragraph"></div>
      <div class="field is-grouped">
        <p v-if="blog.slug" class="control">
          <router-link :to="{ name: 'blog_view', params: { slug: blog.slug }, query: { from_page: from_page }}">
            <button class="button is-info view_more_button">Read More</button>
          </router-link>
        </p>
        <p class="control">
          <router-link v-if="go_to_blog_list" :to="{ name: 'blog_list'}">
            <button class="button is-info view_more_button">See All Blog Entries</button>
          </router-link>
        </p>
      </div>
    </div>
  </div>

</template>

<style scoped>
.is_selected {
  @media screen and (min-width: 769px){
    box-shadow: 0 0.75em 1.5em -0.250em #3e8ed0, 0 0 0 1px #0a0a0a05;
  }
}

.card {
  margin-bottom: 1rem;
}

button {
  margin-top: 1rem;
}
</style>