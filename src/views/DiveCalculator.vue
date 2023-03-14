<script setup>
  import { ref } from 'vue';
  import CalculatorInput from "../components/DiveCalculator/CalculatorInput.vue";
  import CalculatorDisplay from "../components/DiveCalculator/CalculatorDisplay.vue";
  import CalculatorExplanation from "../components/DiveCalculator/CalculatorExplanation.vue";
  import { useAsyncGet } from "../composables/asyncGet";
  import CalculatorProvider from "../providers/CalculatorProvider";

  let calculationResponse = ref({
    dive_1_max_time: null,
    dive_1_pg: null,
    dive_2_max_time: null,
    dive_2_pg: null,
    post_si_pg: null,
    rnt: null,
  });

  let calculationInput = ref({
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
  <div class="columns">
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