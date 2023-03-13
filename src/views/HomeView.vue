<script setup>
  import { onMounted, ref } from "vue";
  import PageProvider from "../providers/PageProvider";

  let page = ref({});

  onMounted(() => {
    PageProvider.getHomePage()
        .then((results) => {
          page.value = results;
        });
  });
</script>

<template>
  <main>
    <div v-if="page.content">Test</div>
  </main>
</template>
