<script setup>
  import { useAlertStore } from "../stores/alert";
  import { onMounted } from "vue";

  onMounted(() => {
    setInterval(() => {
      if (useAlertStore().alerts.length > 0) {
        useAlertStore().decrementMessageTimes();
        useAlertStore().removeExpiredAlerts();
      }
    }, 1000);
  });
</script>

<template>
<div class="alert_container">
  <TransitionGroup>
    <div
        v-for="(alert, key) in useAlertStore().alerts"
        :key="'alert' + key"
        :class="alert.type"
        class="notification"
        data-test="notification"
    >
      <button class="delete" @click="useAlertStore().removeAlert(key)" data-test="notification-dismiss"></button>
      {{ alert.message }}
    </div>
  </TransitionGroup>
</div>
</template>

<style scoped>
.alert_container {
  position: absolute;
  width: 100%;
  z-index: 1000;
  .notification {
    margin-bottom: 0.5rem;
  }
}
</style>