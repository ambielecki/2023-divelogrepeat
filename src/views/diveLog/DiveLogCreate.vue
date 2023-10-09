<script setup>
  import { onMounted, ref } from "vue";
  import DiveLogProvider from "../../providers/DiveLogProvider";
  import LogForm from "@/components/DiveLog/LogForm.vue";
  import { useAlertStore } from "@/stores/alert";
  import router from "@/router";

  const dive_log = ref({
    dive_number: null,
    location: '',
    dive_site: '',
    date_time: '',
    buddy: '',
    max_depth_ft: null,
    bottom_time_min: null,
    surface_interval_min: null,
    used_computer: 0,
    description: '',
    notes: '',
    dive_details: {},
    equipment_details: {},
  });

  const max_dive = ref(0);

  const loading = ref({
    pressure_group: false,
    log_dive: false,
  });

  onMounted(() => {
    DiveLogProvider.getMaxDive()
        .then((response) => {
          if (response?.max_dive) {
            max_dive.value = response.max_dive;
          }
        });
  });

  async function handleSave(form_data) {
    dive_log.value = form_data;
    loading.value.log_dive = true;
    const response = await DiveLogProvider.postCreate(dive_log.value);
    loading.value.log_dive = false;

    if (response) {
      useAlertStore().addAlert('Dive Logged Successfully');
      router.push({ name: 'dive_log' });
    }
  }

  async function handleCancel() {
    router.push({ name: 'dive_log' });
  }
</script>

<template>
  <LogForm :dive_log="dive_log" :max_dive="max_dive" @cancel="handleCancel" @save="handleSave"></LogForm>
</template>

<style scoped>
</style>