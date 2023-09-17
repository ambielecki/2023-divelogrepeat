<script setup>
  import {computed} from "vue";

  const props = defineProps(['dive_log']);
  const emit = defineEmits(['toggle_edit']);

  const computer_text = computed(() => {
    return parseInt(props.dive_log.used_computer) === 1 ? 'Yes' : 'No';
  });

  function edit() {
    emit('edit');
  }
</script>

<template>
  <div class="column is-full">
    <div class="columns is-multiline">

      <div class="column is-full">
        <div class="card">
          <div class="card-content is-vcentered">
            <p class="title main_title">Dive # {{ dive_log.dive_number }}</p>
            <button class="button is-info is-pulled-right" @click="edit">Edit</button>
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
</template>

<style scoped>
  .main_title {
    display: inline;
  }
</style>