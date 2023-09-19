<script setup>
import {computed, onMounted} from "vue";

  const props = defineProps(['dive_log', 'max_dive']);
  const emit = defineEmits(['cancel, save']);

  function cancel() {
    emit('cancel');
  }

  function save() {
    emit('save');
  }

  const next_dive = computed(() => {
    return 'Next Dive: ' + (parseInt(props.max_dive) + 1).toString();
  })
</script>

<template>
  <div class="column is-full">
    <div class="columns is-multiline">

      <div class="column is-full">
        <div class="card">
          <div class="card-content is-vcentered">
            <div class="columns">

              <div class="column is-four-fifths">
                <div class="field is-horizontal">
                  <div class="field-label is-normal">
                    <label class="label" for="dive_number">Dive #</label>
                  </div>

                  <div class="field-body">
                    <div class="field">
                      <div class="control">
                        <input
                            class="input"
                            name="dive_number"
                            type="text"
                            v-model="dive_log.dive_number"
                            :placeholder="next_dive"
                        >
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div class="column is-one-fifth">
                <div class="field is-grouped">
                  <div class="control">
                    <button class="button is-info" type="submit" @click="save">Save</button>
                  </div>
                  <div class="control">
                    <button class="button is-info" @click="cancel">Cancel</button>
                  </div>
                </div>

              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="column is-two-fifths">
        <div class="card">
          <div class="card-content">
            <p class="title">Basic Information</p>
            <div class="field is-horizontal">
              <div class="field-label is-normal">
                <label class="label" for="location">Location</label>
              </div>
              <div class="field-body">
                <div class="field">
                  <div class="control">
                    <input
                        class="input"
                        name="location"
                        type="text"
                        v-model="dive_log.location"
                        placeholder="Location"
                    >
                  </div>
                </div>
              </div>
            </div>

            <div class="field is-horizontal">
              <div class="field-label is-normal">
                <label class="label" for="dive_number">Dive Site</label>
              </div>
              <div class="field-body">
                <div class="field">
                  <div class="control">
                    <input
                        class="input"
                        name="dive_number"
                        type="text"
                        v-model="dive_log.dive_site"
                        placeholder="Dive Site"
                    >
                  </div>
                </div>
              </div>
            </div>

            <div class="field is-horizontal">
              <div class="field-label is-normal">
                <label class="label" for="buddy">Buddy</label>
              </div>
              <div class="field-body">
                <div class="field">
                  <div class="control">
                    <input
                        class="input"
                        name="buddy"
                        type="text"
                        v-model="dive_log.buddy"
                        placeholder="Buddy"
                    >
                  </div>
                </div>
              </div>
            </div>

            <div class="field is-horizontal">
              <div class="field-label is-normal">
                <label class="label" for="date_time">Date Time</label>
              </div>
              <div class="field-body">
                <div class="field">
                  <div class="control">
                    <input
                        class="input"
                        name="date_time"
                        type="text"
                        v-model="dive_log.date_time"
                        placeholder="YYYY-MM-DD HH:MM:SS AM"
                    >
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>

      <div class="column is-three-fifths">
        <div class="card">
          <div class="card-content">
            <p class="title">Dive Details</p>

            <div class="field is-horizontal">
              <div class="field-label is-normal">
                <label class="label" for="max_depth_ft">Max Depth (ft)</label>
              </div>
              <div class="field-body">
                <div class="field">
                  <div class="control">
                    <input
                        class="input"
                        name="max_depth_ft"
                        type="text"
                        v-model="dive_log.max_depth_ft"
                        placeholder="Max Depth (ft)"
                    >
                  </div>
                </div>
              </div>
            </div>

            <div class="field is-horizontal">
              <div class="field-label is-normal">
                <label class="label" for="bottom_time_min">Bottom Time (min)</label>
              </div>
              <div class="field-body">
                <div class="field">
                  <div class="control">
                    <input
                        class="input"
                        name="bottom_time_min"
                        type="text"
                        v-model="dive_log.bottom_time_min"
                        placeholder="Max Depth (ft)"
                    >
                  </div>
                </div>
              </div>
            </div>

            <div class="field is-horizontal">
              <div class="field-label is-normal">
                <label class="label" for="surface_interval_min">Surface Interval (min)</label>
              </div>
              <div class="field-body">
                <div class="field">
                  <div class="control">
                    <input
                        class="input"
                        name="surface_interval_min"
                        type="text"
                        v-model="dive_log.surface_interval_min"
                        placeholder="Surface Interval (min)"
                    >
                  </div>
                </div>
              </div>
            </div>

            <div class="field is-horizontal">
              <div class="field-label">
                <label class="label" for="used_computer">Computer</label>
              </div>
              <div class="field-body">
                <div class="field is-narrow">
                  <div class="control">
                    <label class="radio">
                      <input type="radio" name="used_computer" value="1" v-model="dive_log.used_computer">
                      Yes
                    </label>
                    <label class="radio">
                      <input type="radio" name="used_computer" value="0" v-model="dive_log.used_computer">
                      No
                    </label>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>

      <div class="column is-half">
        <div class="card">
          <div class="card-content">
            <p class="title">Notes</p>
            <div class="field is-horizontal">
              <div class="field-body">
                <div class="field">
                  <div class="control">
                    <label class="label" for="notes">
                      <div class="field">
                        <div class="control">
                          <textarea class="textarea is-medium" name="notes" v-model="dive_log.notes"></textarea>
                        </div>
                      </div>
                    </label>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="column is-half">
        <div class="card">
          <div class="card-content">
            <p class="title">Description</p>
            <div class="field is-horizontal">
              <div class="field-body">
                <div class="field">
                  <div class="control">
                    <label class="label" for="description">
                      <div class="field">
                        <div class="control">
                          <textarea class="textarea is-medium" name="description" v-model="dive_log.description"></textarea>
                        </div>
                      </div>
                    </label>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

    </div>
  </div>
</template>

<style scoped>
  .main_title {
    display: inline;
  }

  .button_group button {
    margin: 0 0.25rem;
  }
</style>