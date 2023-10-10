<script setup>
import ImageDisplay from "@/components/Image/ImageDisplay.vue";
import { computed } from "vue";

const props = defineProps(['blog', 'show_image','is_selected']);
const card_class = computed(() => {
  let base_class = 'card blog-preview';
  if (props.is_selected) {
    base_class = base_class + ' is_selected';
  }

  return base_class;
});

</script>

<template>
  <div :class="card_class">
    <div v-if="show_image && blog.content.images && blog.content.images.length > 0" class="card-image">
      <figure class="image">
        <ImageDisplay :image="blog.content.images[0]" size="medium"></ImageDisplay>
      </figure>
    </div>
    <div class="card-content">
      <p class="title is-5">{{ blog.title }}</p>
      <div v-html="blog.content.first_paragraph"></div>
      <button class="button is-info">View More</button>
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
</style>