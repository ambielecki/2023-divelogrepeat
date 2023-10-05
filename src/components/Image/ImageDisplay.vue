<script setup>
import { computed } from "vue";

const props = defineProps(['image', 'size']);

const base_image_path = import.meta.env.VITE_IMAGE_URL;

const image_size = computed(() => {
  return props.size ? props.size : 'medium';
})
</script>
<template>
<img v-if="image.has_sizes && size !== 'full'" :src="base_image_path + image.public_path + '/' + image_size + '/' + image.file_name"
     :alt="image.alt_tag">
<img v-else :src="base_image_path + image.public_path + '/' + image.file_name" :alt="image.alt_tag">
</template>