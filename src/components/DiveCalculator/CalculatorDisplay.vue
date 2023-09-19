<script setup>
  const props = defineProps(['calculationDisplay']);
</script>

<style scoped>
  .card {
    background-color: #3e8ed0;
  }

  .card .title {
    color: #fff;
  }

  .card .table {
    background-color: #3e8ed0;
    color: #fff;
  }

  table > tr:last-child > td {
    border-width: 0;
  }
</style>


<template>
  <div class="card is-info">
    <div class="card-content">
      <p class="title is-4">Get Your Results</p>
      <div class="content">
        <table class="table">
          <Transition>
            <tr v-if="calculationDisplay.dive_1_max_time">
              <td>Max time for Dive 1:</td>
              <td>{{ calculationDisplay.dive_1_max_time }}</td>
            </tr>
          </Transition>
         <Transition>
           <tr v-if="calculationDisplay.dive_1_pg">
             <td>Pressure Group after Dive 1:</td>
             <td>{{ calculationDisplay.dive_1_pg }}</td>
           </tr>
         </Transition>
          <Transition>
            <tr v-if="calculationDisplay.post_si_pg">
              <td>Pressure Group after Surface Interval:</td>
              <td>{{ calculationDisplay.post_si_pg }}</td>
            </tr>
          </Transition>
          <Transition>
            <tr v-if="calculationDisplay.rnt">
              <td>Residual Nitrogen Time:</td>
              <td>{{ calculationDisplay.rnt }}</td>
            </tr>
          </Transition>
          <Transition>
            <tr v-if="calculationDisplay.dive_2_max_time">
              <td>Max Time for Dive 2:</td>
              <td>{{ calculationDisplay.dive_2_max_time }}</td>
            </tr>
          </Transition>
          <Transition>
            <tr v-if="calculationDisplay.dive_2_pg">
              <td>Pressure Group after Dive 2:</td>
              <td>{{ calculationDisplay.dive_2_pg }}</td>
            </tr>
          </Transition>
        </table>
      </div>
    </div>
  </div>
</template>