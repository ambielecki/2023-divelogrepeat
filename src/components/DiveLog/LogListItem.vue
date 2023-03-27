<script setup>
  const props = defineProps(['dive_log']);
</script>

<style scoped>
  .card-content .column {
    padding: 0.25rem;
  }

  .dive_item:hover {
    box-shadow: 0 0.75em 1.5em -0.250em #3e8ed0, 0 0 0 1px #0a0a0a05;
  }
</style>

<template>
  <router-link :to="{ name: 'dive_log_view', params: { id:dive_log.id }}">
    <div class="card dive_item">
      <div class="card-content">
        <div class="columns">
          <div class="column">
            <p class="title is-4">Dive # {{ dive_log.dive_number }}</p>
          </div>
        </div>
        <div class="columns">
          <div class="column">
            <p class="title is-6">Location: {{ dive_log.location }}</p>
          </div>
          <div class="column">
            <p class="title is-6">Dive Site: {{ dive_log.dive_site }}</p>
          </div>
        </div>
        <div class="columns">
          <div class="column">
            <p class="title is-6">Date: {{ dive_log.date }}</p>
          </div>
        </div>
        <div class="columns">
          <div class="column">
            <p>{{ dive_log.description }}</p>
          </div>
        </div>
      </div>
    </div>
  </router-link>
</template>