<script setup>
import { onMounted, ref } from "vue";
import ReportProvider from "@/providers/ReportProvider";

const users_report = ref({});
const show_report = ref(false);

onMounted(() => {
  ReportProvider.getUsersReport()
      .then((response) => {
        if (response) {
          users_report.value = response;
          show_report.value = true;
        }
      });
})
</script>

<template>
<div v-if="show_report">
  <div class="card has-background-dark has-text-white">
    <div class="card-content">
      <p class="title has-text-white">Users</p>
      <p><b>Total: {{users_report.total}}</b></p>
      <p><b>Last 30 Days: {{users_report.last_thirty_days}}</b></p>
    </div>
  </div>
</div>
</template>

<style scoped>
</style>