<script setup>
  const props = defineProps(['calculationInput']);
</script>

<template>
  <div class="card">
    <div class="card-content">
      <div class="columns is-mobile">
        <div class="column is-half">
          <div class="field">
            <label class="label">Dive 1 Depth</label>
            <div class="control">
              <input type="number" id="dive_1_depth" v-model="calculationInput.dive_1_depth">
            </div>
          </div>
        </div>
        <div class="column is-half">
          <div class="field">
            <label class="label">Dive 1 Time</label>
            <div class="control">
              <input type="number" id="dive_1_time" v-model="calculationInput.dive_1_time">
            </div>
          </div>
        </div>
      </div>

      <div class="columns is-mobile">
        <div class="column is-half">
          <div class="field">
            <label class="label">Surface Interval</label>
            <div class="control">
              <input type="number" id="surface_interval" v-model="calculationInput.surface_interval">
            </div>
          </div>
        </div>
      </div>

      <div class="columns is-mobile">
        <div class="column is-half">
          <div class="field">
            <label class="label">Dive 2 Depth</label>
            <div class="control">
              <input type="number" id="dive_2_depth" v-model="calculationInput.dive_2_depth">
            </div>
          </div>
        </div>
        <div class="column is-half">
          <div class="field">
            <label class="label">Dive 2 Time</label>
            <div class="control">
              <input type="number" id="dive_2_time" v-model="calculationInput.dive_2_time">
            </div>
          </div>
        </div>
      </div>

      <div class="columns is-mobile">
        <div class="column is-one-third">
          <div class="field is-grouped">
            <div class="control">
              <button @click="$emit('calculateDive')" type="button" class="button is-info">Calculate</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>