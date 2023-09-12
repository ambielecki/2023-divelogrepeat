<script setup>
  import {ref, onMounted} from "vue";
  import DiveLogProvider from "@/providers/DiveLogProvider";
  import {useRoute} from "vue-router";

  const route = useRoute();

  const dive_log = ref({});
  const is_loading = ref(true);

  onMounted(() => {
    getDetails();
  });

  async function getDetails() {
    is_loading.value = true;

    const result = await DiveLogProvider.getDetails(
        route.params.id
    );

    if (result) {
        dive_log.value = result.dive_log;
    }

    is_loading.value = false
  }


</script>

<template>
  View
</template>