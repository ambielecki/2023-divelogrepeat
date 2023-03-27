<script setup>
  import { onMounted, ref } from "vue";
  import DiveLogProvider from "../../providers/DiveLogProvider";

  const log = ref({
    dive_number: null,
    location: '',
    dive_site: '',
    date: '',
    description: '',
    notes: '',
    dive_details: {
      method: 'computer',
      max_depth: null,
      bottom_time: null,
      last_dive_pg: null,
      surface_interval: null,
    },
    equipment_details: {

    },
  });

  const loading = ref({
    pressure_group: false,
    log_dive: false,
  });

  onMounted(() => {
    DiveLogProvider.getMaxDive()
        .then((response) => {
          if (response?.max_dive_number) {
            log.value.dive_number = response.max_dive_number + 1;
          }
        });
  });

  async function checkPressureGroup() {
    loading.value.pressure_group = true;

    const response = await DiveLogProvider.getLastPressureGroup();
    if (response?.last_dive_pg) {
      log.value.dive_details.last_dive_pg = response.last_dive_pg;
    }

    loading.value.pressure_group = false;
  }

  async function logDive() {
    loading.value.log_dive = true;
    const response = DiveLogProvider.postCreate(log.value);

    loading.value.log_dive = false;
  }
</script>

<style scoped>
  .spacer {
    margin-bottom: 2em;
  }
</style>

<template>
  <div class="columns is-mobile is-multiline">
    <div class="column">
      <div class="card">
        <div class="card-content">
          <div class="columns is-mobile is-vcentered">
            <div class="column is-half-mobile">
              <div class="title is-4">Log New Dive</div>
            </div>
            <div class="column is-half-mobile">
              <div class="control is-pulled-right">
                <button @click="logDive" type="button" class="button is-info" :class="{'is-loading': loading.log_dive}">Log It</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>

  <div class="columns is-mobile is-multiline">
    <div class="column is-full-mobile is-half-tablet is-one-third-desktop">
      <div class="card">
        <div class="card-content">
          <p class="title is-5">
            Basics
          </p>
          <div class="columns is-mobile is-multiline">
            <div class="column is-full">
              <div class="field">
                <label class="label">Dive #</label>
                <div class="control">
                  <input class="input" type="number" id="dive_number" v-model="log.dive_number" placeholder="Fetching Dive Number">
                </div>
              </div>
            </div>

            <div class="column is-half">
              <div class="field">
                <label class="label">Location</label>
                <div class="control">
                  <input class="input" type="text" id="location" v-model="log.location" placeholder="Location">
                </div>
              </div>
            </div>
            <div class="column is-half">
              <div class="field">
                <label class="label">Dive Site</label>
                <div class="control">
                  <input class="input" type="text" id="dive_site" v-model="log.dive_site" placeholder="Dive Site">
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="column is-full-mobile is-half-tablet is-two-thirds-desktop">
      <div class="card">
        <div class="card-content">
          <p class="title is-5">
            Description / Notes
          </p>
          <div class="columns is-mobile is-multiline">
            <div class="column is-half-tablet is-full-mobile">
              <div class="field">
                <label class="label">Description</label>
                <div class="control">
                  <textarea class="textarea" id="notes" v-model="log.description" placeholder="Description"></textarea>
                </div>
              </div>
            </div>

            <div class="column is-half-tablet is-full-mobile">
              <div class="field">
                <label class="label">Notes</label>
                <div class="control">
                  <textarea class="textarea" id="notes" v-model="log.notes" placeholder="Notes"></textarea>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="column is-full-mobile is-half-tablet is-one-third-desktop">
      <div class="card">
        <div class="card-content">
          <p class="title is-5">
            Dive Details
          </p>
          <div class="columns">
            <div class="column is-full">
              <div class="control">
                <label class="radio">
                  <input type="radio" name="method" value="computer" v-model="log.dive_details.method">
                  Computer
                </label>
                <label class="radio">
                  <input type="radio" name="method" value="tables" v-model="log.dive_details.method">
                  Tables
                </label>
              </div>
            </div>
          </div>
          <div v-if="log.dive_details.method === 'tables'" class="columns is-multiline">
            <div class="column is-half">
              <div class="field">
                <label class="label">Last Dive End PG</label>
                <div class="control">
                  <input class="input" type="text" id="last_dive_pg" v-model="log.dive_details.last_dive_pg" placeholder="PG">
                </div>
              </div>
            </div>

            <div class="column is-half">
              <div class="spacer"></div>
              <div class="control">
                <button @click="checkPressureGroup" type="button" class="button is-info" :class="{'is-loading': loading.pressure_group}">Check</button>
              </div>
            </div>

            <div class="column is-full">
              <div class="field">
                <label class="label">Surface Interval</label>
                <div class="control">
                  <input class="input" type="text" id="surface_interval" v-model="log.dive_details.surface_interval" placeholder="Surface Interval">
                </div>
              </div>
            </div>
          </div> <!-- end tables columns -->

          <div class="columns is-multiline is-mobile">
            <div class="column is-half-mobile">
              <div class="field">
                <label class="label">Max Depth</label>
                <div class="control">
                  <input class="input" type="text" id="max_depth" v-model="log.dive_details.max_depth" placeholder="Max Depth">
                </div>
              </div>
            </div>

            <div class="column is-half-mobile">
              <div class="field">
                <label class="label">Bottom Time</label>
                <div class="control">
                  <input class="input" type="text" id="bottom_time" v-model="log.dive_details.bottom_time" placeholder="Bottom Time">
                </div>
              </div>
            </div>
          </div> <!-- columns after computer / tables -->
        </div>
      </div>
    </div>

  </div> <!-- end columns -->
</template>