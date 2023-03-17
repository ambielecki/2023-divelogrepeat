<script setup>
  import { onMounted, ref } from "vue";
  import DiveLogProvider from "../../providers/DiveLogProvider";

  let dive_logs = ref([]);

  onMounted(() => {
    DiveLogProvider.getList()
        .then((results) => {
          dive_logs.value = results;
        });
  });
</script>

<template>
  <div>
    DiveLog
  </div>
</template>