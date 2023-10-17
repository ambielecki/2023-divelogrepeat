<script setup>
import { ref, onMounted } from "vue";
import PageProvider from "@/providers/PageProvider";
import { useRoute } from "vue-router";

const blog = ref({});
const route = useRoute();

onMounted(() => {
  PageProvider.getBlogByParent(route.params.id)
      .then((result) => {
        blog.value = result.blog_page;
      })
});
</script>

<template>
Edit
</template>