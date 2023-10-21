<script setup>
import { onMounted, ref } from "vue";
import ReportProvider from "@/providers/ReportProvider";

const dive_logs_report = ref({});
const show_report = ref(false);

onMounted(() => {
  ReportProvider.getDiveLogsReport()
      .then((response) => {
        if (response) {
          dive_logs_report.value = response;
          show_report.value = true;
        }
      });
})
</script>

<template>
<div v-if="show_report">
  <div class="card has-background-dark has-text-white">
    <div class="card-content">
      <p class="title has-text-white">Dive Logs</p>
      <p><b>Total: {{dive_logs_report.total}}</b></p>
      <p><b>Last 30 Days: {{dive_logs_report.last_thirty_days}}</b></p>
    </div>
  </div>
</div>
</template>