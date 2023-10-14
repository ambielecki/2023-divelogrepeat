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

  const table_data = ref({});
  const show_tables = computed(() => {
    return Object.keys(table_data.value).length > 0;
  })

  async function calculateDive() {
    calculationResponse.value = await CalculatorProvider.calculateDive(calculationInput.value);
  }

  function applyClass(column) {
    const to_highlight = document.querySelectorAll("[data-column='" + column + "']");
    to_highlight.forEach(element => element.classList.add('hover_column'));
  }

  function removeClass(column) {
    const to_highlight = document.querySelectorAll("[data-column='" + column + "']");
    to_highlight.forEach(element => element.classList.remove('hover_column'));
  }

  onMounted(() => {
    CalculatorProvider.getTableData()
        .then((response) => {
          table_data.value = response.dive_tables;
        });
  });
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

    <div v-if="show_tables" class="column is-half-widescreen">
      <div class="card">
        <div class="card-content">
          <p class="title is-4">Table 1</p>
          <table class="table is-narrow">
            <thead>
            <tr>
              <th></th>
              <th
                  v-for="(depth, index_1) in table_data.depths"
                  @mouseenter="applyClass(index_1)"
                  @mouseleave="removeClass(index_1)"
                  :data-column="index_1"
              >
                {{ depth }}
              </th>
            </tr>
            </thead>
            <tbody>
            <tr v-for="(ndls, pressure_group) in table_data.table_one">
              <td><b>{{ pressure_group}}</b></td>
              <td
                  @mouseenter="applyClass(index_2)"
                  @mouseleave="removeClass(index_2)"
                  v-for="(ndl, index_2)
                in ndls"
                  :data-column="index_2"
                  class="hover_td"
              >
                {{ ndl }}
              </td>
            </tr>
            </tbody>
          </table>
        </div>
      </div>
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