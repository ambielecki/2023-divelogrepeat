<script setup>
import { onMounted, ref } from "vue";
import DiveLogProvider from "../../providers/DiveLogProvider";
import LogForm from "@/components/DiveLog/LogForm.vue";
import { useAlertStore } from "@/stores/alert";
import router from "@/router";
import { diveLog } from "@/composables/models/DiveLog";

const dive_log = ref(diveLog().createDiveLog({}));
const errors = ref({
  has_errors: false,
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

function handleSave(form_data) {
  dive_log.value = form_data;
  loading.value.log_dive = true;
  errors.value = {
    has_errors: false,
  };

  const validation_errors = diveLog().validateDiveLog(dive_log.value);
  if (validation_errors.has_errors) {
    errors.value = validation_errors;

    return false;
  }

  DiveLogProvider.postCreate(dive_log.value)
      .then((response) => {
        loading.value.log_dive = false;

        if (response) {
          useAlertStore().addAlert('Dive Logged Successfully');
          router.push({name: 'dive_log'});
        }
      });
}

function handleCancel() {
  router.push({name: 'dive_log'});
}
</script>

<template>
<LogForm :dive_log="dive_log" :max_dive="max_dive" @cancel="handleCancel" @save="handleSave" :errors="errors"></LogForm>
</template>

<style scoped>
</style>