<script setup>
import { computed, onMounted, ref } from 'vue';
  import CalculatorInput from "../components/DiveCalculator/CalculatorInput.vue";
  import CalculatorDisplay from "../components/DiveCalculator/CalculatorDisplay.vue";
  import CalculatorExplanation from "../components/DiveCalculator/CalculatorExplanation.vue";
  import CalculatorProvider from "../providers/CalculatorProvider";

  const calculationResponse = ref({
    dive_1_max_time: null,
    dive_1_pg: null,
    dive_2_max_time: null,
    dive_2_pg: null,
    post_si_pg: null,
    rnt: null,
  });

  const calculationInput = ref({
    dive_1_depth: null,
    dive_1_time: null,
    surface_interval: null,
    dive_2_depth: null,
    dive_2_time: null,
  });

  async function calculateDive() {
    calculationResponse.value = await CalculatorProvider.calculateDive(calculationInput.value);
  }
</script>

<template>
  <div class="columns is-multiline">
    <div class="column is-one-third">
      <CalculatorExplanation/>
    </div>
    <div class="column is-one-third">
      <CalculatorInput @calculate-dive="calculateDive" :calculation-input="calculationInput"/>
    </div>
    <div class="column is-one-third">
      <CalculatorDisplay :calculation-display="calculationResponse"/>
    </div>
  </div>
</template>

<style scoped>
tbody {
  & tr:nth-child(odd) {
    background-color: #98c3e6;
  }
  & tr:hover {
    background-color: #ffffb3;
  }
}

td {
  text-align: center !important;
  &.hover_td:hover {
    background-color: yellow;
  }
}

th {
  text-align: center !important;
}

.hover_column {
  background-color: #ffffb3;
}
</style>