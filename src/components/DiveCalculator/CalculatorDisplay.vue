<script setup>
  const props = defineProps(['calculationDisplay']);
</script>

<template>
  <div class="card is-info">
    <div class="card-content">
      <p class="title is-4">Get Your Results</p>
      <div class="content">
        <table class="table">
          <tr v-if="calculationDisplay.dive_1_max_time">
            <td>Max time for Dive 1:</td>
            <td>{{ calculationDisplay.dive_1_max_time }} min</td>
          </tr>
          <tr v-if="calculationDisplay.dive_1_pg">
            <td>Pressure Group after Dive 1:</td>
            <td>{{ calculationDisplay.dive_1_pg }}</td>
          </tr>
          <tr v-if="calculationDisplay.post_si_pg">
            <td>Pressure Group after Surface Interval:</td>
            <td>{{ calculationDisplay.post_si_pg }}</td>
          </tr>
          <tr v-if="calculationDisplay.rnt">
            <td>Residual Nitrogen Time:</td>
            <td>{{ calculationDisplay.rnt }} min</td>
          </tr>
          <tr v-if="calculationDisplay.dive_2_max_time">
            <td>Max Time for Dive 2:</td>
            <td>{{ calculationDisplay.dive_2_max_time }} min</td>
          </tr>
          <tr v-if="calculationDisplay.dive_2_pg">
            <td>Pressure Group after Dive 2:</td>
            <td>{{ calculationDisplay.dive_2_pg }}</td>
          </tr>
        </table>
      </div>
    </div>
  </div>
</template>