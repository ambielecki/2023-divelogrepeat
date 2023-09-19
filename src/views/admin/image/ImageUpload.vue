<script setup>
  import { computed } from "vue";
  import { useUserStore } from "@/stores/user";
  import ImageUploadForm from "@/components/Image/ImageUploadForm.vue";

  const isAdmin = computed(() => {
    return useUserStore().getIsAdmin();
  });

</script>

<template>
  <div v-if="isAdmin">
    <ImageUploadForm></ImageUploadForm>
  </div>
  <div v-else>
    <p>Not Authorized</p>
  </div>
</template>