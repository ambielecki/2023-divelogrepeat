<script setup>
  const props = defineProps(['calculationDisplay']);
</script>

<template>
  <div class="card">
    <div class="card-body">
      <div class="card-title">Dive Info</div>
      <p class="card-text">
        Dive 1 Max Bottom Time: {{ calculationDisplay.dive_1_max_time }} <br />
        Dive 1 Pressure Group: {{ calculationDisplay.dive_1_pg }}
      </p>
    </div>
  </div>
</template>