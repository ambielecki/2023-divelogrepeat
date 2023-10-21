<script setup>
  import { ref, computed } from "vue";
  import ConfirmationModal from "@/components/ConfirmationModal.vue";
  import DiveLogProvider from "@/providers/DiveLogProvider";
  import { useAlertStore } from "@/stores/alert";
  import router from "@/router";

  const props = defineProps(['dive_log']);
  const emit = defineEmits(['edit']);
  const show_modal = ref(false);

  const computer_text = computed(() => {
    return parseInt(props.dive_log.used_computer) === 1 ? 'Yes' : 'No';
  });

  function edit() {
    emit('edit');
  }

  function toggleModal() {
    show_modal.value = !show_modal.value;
  }

  function deleteLog() {
    const response = DiveLogProvider.delete(props.dive_log.id);
    toggleModal();

    if (response) {
      useAlertStore().addAlert('Log Deleted Successfully');
      router.push({ name: 'dive_log' });
    }
  }
</script>

<template>
  <div class="column is-full">
    <div class="columns is-multiline">
      <div class="column is-full">
        <div class="card">
          <div class="card-content is-vcentered">
            <p class="title main_title">Dive # {{ dive_log.dive_number }}</p>
            <div class="field is-grouped is-pulled-right">
              <p class="control">
                <button class="button is-info" @click="edit">Edit</button>
              </p>
              <p>
                <button class="button is-danger" @click="toggleModal">Delete</button>
              </p>
            </div>

          </div>
        </div>
      </div>

      <div class="column is-half">
        <div class="card">
          <div class="card-content">
            <p class="title">Basic Information</p>
            <p><b>Location:</b> {{ dive_log.location }}</p>
            <p><b>Dive Site:</b> {{ dive_log.dive_site }}</p>
            <p><b>Buddy:</b> {{ dive_log.buddy }}</p>
            <p><b>DateTime:</b> {{ $filters.formatDate(dive_log.date_time) }}</p>
          </div>
        </div>
      </div>

      <div class="column is-half">
        <div class="card">
          <div class="card-content">
            <p class="title">Dive Details</p>
            <p><b>Max Depth (ft):</b> {{ dive_log.max_depth_ft }}</p>
            <p><b>Bottom Time (min):</b> {{ dive_log.bottom_time_min }}</p>
            <p><b>Surface Interval (min):</b> {{ dive_log.surface_interval_min }}</p>
            <p><b>Computer:</b> {{ computer_text }}</p>
          </div>
        </div>
      </div>

      <div class="column is-half">
        <div class="card">
          <div class="card-content">
            <p class="title">Equipment Details</p>
            <p><b>Exposure Protection:</b> {{ dive_log.equipment_details?.exposure_suit }}</p>
            <p><b>Weight:</b> {{ dive_log.equipment_details?.weight }}</p>
          </div>
        </div>
      </div>

      <div class="column is-half">
        <div class="card">
          <div class="card-content">
            <p class="title">Conditions</p>
            <p><b>Dive Type (boat / shore):</b> {{ dive_log.dive_details?.dive_type }}</p>
            <p><b>Weather:</b> {{ dive_log.dive_details?.weather }}</p>
            <p><b>Surface Conditions:</b> {{ dive_log.dive_details?.surface_conditions }}</p>
            <p><b>Visibility:</b> {{ dive_log.dive_details?.visibility }}</p>
            <p><b>Water Temperature:</b> {{ dive_log.dive_details?.water_temperature }}</p>
            <p><b>Air Temperature:</b> {{ dive_log.dive_details?.air_temperature }}</p>
          </div>
        </div>
      </div>

      <div class="column is-half">
        <div class="card">
          <div class="card-content">
            <p class="title">Notes</p>
            {{ dive_log.notes }}
          </div>
        </div>
      </div>

      <div class="column is-half">
        <div class="card">
          <div class="card-content">
            <p class="title">Description</p>
            {{ dive_log.description }}
          </div>
        </div>
      </div>

    </div>
  </div>

<ConfirmationModal
  message="Are you sure you want to delete this log?"
  confirm_text="Delete"
  :is_active="show_modal"
  @close="toggleModal"
  @confirm="deleteLog"
/>
</template>

<style scoped>
  .main_title {
    display: inline;
  }
</style>