<script setup>
  const props = defineProps(['calculationInput']);
</script>

<template>
  <div class="card">
    <div class="card-body">
      <div class="card-title">Calculate Dive</div>
      <form>
        <div class="row">
          <div class="col-6">
            <div class="form-group">
              <label for="dive_1_depth">Dive 1 Depth (ft)</label>
              <input type="number" class="form-control" id="dive_1_depth" v-model="calculationInput.dive_1_depth">
            </div>
          </div>
          <div class="col-6">
            <div class="form-group">
              <label for="dive_1_time">Dive 1 Time (min)</label>
              <input type="number" class="form-control" id="dive_1_time" v-model="calculationInput.dive_1_time">
            </div>
          </div>
        </div>
        <button @click="$emit('calculateDive')" type="button" class="btn btn-primary">Calculate</button>
      </form>
    </div>
  </div>
</template>