<script setup>
  import { computed, onMounted, ref } from "vue";
  import TextInput from "@/components/FormFields/TextInput.vue";
  import TextAreaInput from "@/components/FormFields/TextAreaInput.vue";
  import RadioInput from "@/components/FormFields/RadioInput.vue";
  import VueDatePicker from '@vuepic/vue-datepicker';
  import '@vuepic/vue-datepicker/dist/main.css'

  const props = defineProps(['dive_log', 'max_dive', 'errors']);
  const emit = defineEmits(['cancel', 'save']);
  const form_data = ref({});
  const display_all_form_fields = ref(false);
  const computer_values = {
    Yes: 1,
    No: 0,
  };

  function cancel() {
    emit('cancel');
  }

  function save() {
    emit('save', form_data.value);
  }

  const next_dive = computed(() => {
    return 'Next Dive: ' + (parseInt(props.max_dive) + 1).toString();
  });

  onMounted(() => {
    form_data.value = JSON.parse(JSON.stringify(props.dive_log));
    display_all_form_fields.value = true;
  });
</script>

<template>

<div class="columns is-multiline">

  <div class="column is-full">
    <div class="card">
      <div class="card-content is-vcentered">
        <div class="columns">

          <div class="column is-four-fifths">
            <TextInput
              input_label="Dive #"
              input_name="dive_number"
              :input_placeholder="next_dive"
              v-model="form_data.dive_number"
              :errors="errors?.dive_number"
            />
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

  <div class="column is-half">
    <div class="card">
      <div class="card-content">
        <p class="title">Basic Information</p>
        <TextInput
            input_label="Location"
            input_name="location"
            input_placeholder="Location"
            v-model="form_data.location"
            is_stacked="true"
            :errors="errors?.dive_location"
        />
        <TextInput
            input_label="Dive Site"
            input_name="dive_site"
            input_placeholder="Dive Site"
            v-model="form_data.dive_site"
            is_stacked="true"
            :errors="errors?.dive_site"
        />
        <TextInput
            input_label="Buddy"
            input_name="buddy"
            input_placeholder="Buddy"
            v-model="form_data.buddy"
            is_stacked="true"
            :errors="errors?.buddy"
        />

        <div class="field">
          <label class="label" for="date_time">Date Time</label>
          <div class="control">
            <VueDatePicker name="date_time" :is24="false" v-model="form_data.date_time"></VueDatePicker>
          </div>
        </div>
        <div v-if="errors?.date_time && errors?.date_time.length > 0" class="field is-grouped is-horizontal">
          <div class="field-body">
            <div class="control">
              <p class="help is-danger" v-for="date_error in errors.date_time">
                {{ date_error }}
              </p>
            </div>
          </div>
        </div>


      </div>
    </div>
  </div>

  <div class="column is-half">
    <div class="card">
      <div class="card-content">
        <p class="title">Dive Details</p>
        <TextInput
            input_label="Max Depth (ft)"
            input_name="max_depth_ft"
            input_placeholder="Max Depth (ft)"
            v-model="form_data.max_depth_ft"
            is_stacked="true"
            :errors="errors?.max_depth_ft"
        />
        <TextInput
            input_label="Bottom Time (min)"
            input_name="bottom_time_min"
            input_placeholder="Bottom Time (min)"
            v-model="form_data.bottom_time_min"
            is_stacked="true"
            :errors="errors?.bottom_time_min"
        />
        <TextInput
            input_label="Surface Interval (min)"
            input_name="surface_interval_min"
            input_placeholder="Surface Interval (min)"
            v-model="form_data.surface_interval_min"
            is_stacked="true"
            :errors="errors?.surface_interval_min"
        />
        <RadioInput
          input_name="computer"
          input_label="Computer"
          :input_values="computer_values"
          v-model="form_data.used_computer"
          is_stacked="true"
        />
      </div>
    </div>
  </div>

  <div class="column is-half">
    <div class="card">
      <div class="card-content">
        <p class="title">Equipment</p>
        <TextInput
            v-if="display_all_form_fields"
            input_label="Exposure Protection"
            input_name="exposure_suit"
            input_placeholder="Exposure Protection"
            v-model="form_data.equipment_details.exposure_suit"
            is_stacked="true"
        />
        <TextInput
            v-if="display_all_form_fields"
            input_label="Weight"
            input_name="weight"
            input_placeholder="Weight"
            v-model="form_data.equipment_details.weight"
            is_stacked="true"
        />
      </div>
    </div>
  </div>

  <div class="column is-half">
    <div class="card">
      <div class="card-content">
        <p class="title">Conditions</p>
        <TextInput
            v-if="display_all_form_fields"
            input_label="Dive Type"
            input_name="dive_type"
            input_placeholder="Dive Type"
            v-model="form_data.dive_details.dive_type"
            is_stacked="true"
        />
        <TextInput
            v-if="display_all_form_fields"
            input_label="Weather"
            input_name="weather"
            input_placeholder="Weather"
            v-model="form_data.dive_details.weather"
            is_stacked="true"
        />
        <TextInput
            v-if="display_all_form_fields"
            input_label="Surface Conditions"
            input_name="surface_conditions"
            input_placeholder="Surface Conditions"
            v-model="form_data.dive_details.surface_conditions"
            is_stacked="true"
        />
        <TextInput
            v-if="display_all_form_fields"
            input_label="Air Temperature"
            input_name="air_temperature"
            input_placeholder="Air Temperature"
            v-model="form_data.dive_details.air_temperature"
            is_stacked="true"
        />
        <TextInput
            v-if="display_all_form_fields"
            input_label="Visibility"
            input_name="visibility"
            input_placeholder="Visibility"
            v-model="form_data.dive_details.visibility"
            is_stacked="true"
        />
        <TextInput
            v-if="display_all_form_fields"
            input_label="Water Temperature"
            input_name="water_temperature"
            input_placeholder="Water Temperature"
            v-model="form_data.dive_details.water_temperature"
            is_stacked="true"
        />
      </div>
    </div>
  </div>

  <div class="column is-half">
    <div class="card">
      <div class="card-content">
        <TextAreaInput
          input_label="Notes"
          input_name="notes"
          v-model="form_data.notes"
          is_stacked="true"
          :errors="errors?.notes"
        ></TextAreaInput>
      </div>
    </div>
  </div>
  <div class="column is-half">
    <div class="card">
      <div class="card-content">
        <TextAreaInput
            input_label="Description"
            input_name="description"
            v-model="form_data.description"
            is_stacked="true"
            :errors="errors?.description"
        ></TextAreaInput>
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