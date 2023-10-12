<script setup>
  import { computed, onMounted, ref } from "vue";
  import TextInput from "@/components/FormFields/TextInput.vue";
  import TextAreaInput from "@/components/FormFields/TextAreaInput.vue";
  import RadioInput from "@/components/FormFields/RadioInput.vue";
  import VueDatePicker from '@vuepic/vue-datepicker';
  import '@vuepic/vue-datepicker/dist/main.css'

  const props = defineProps(['dive_log', 'max_dive']);
  const emit = defineEmits(['cancel', 'save']);
  const form_data = ref({});
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
              has_title="true"
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
        />
        <TextInput
            input_label="Dive Site"
            input_name="dive_site"
            input_placeholder="Dive Site"
            v-model="form_data.dive_site"
            is_stacked="true"
        />
        <TextInput
            input_label="Buddy"
            input_name="buddy"
            input_placeholder="Buddy"
            v-model="form_data.buddy"
            is_stacked="true"
        />

        <div class="field">
          <label class="label" for="date_time">Date Time</label>
          <div class="control">
            <VueDatePicker name="date_time" :is24="false" v-model="form_data.date_time"></VueDatePicker>
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
        />
        <TextInput
            input_label="Bottom Time (min)"
            input_name="bottom_time_min"
            input_placeholder="Bottom Time (min)"
            v-model="form_data.bottom_time_min"
            is_stacked="true"
        />
        <TextInput
            input_label="Surface Interval (min)"
            input_name="surface_interval_min"
            input_placeholder="Surface Interval (min)"
            v-model="form_data.surface_interval_min"
            is_stacked="true"
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
        <TextAreaInput
          input_label="Notes"
          input_name="notes"
          v-model="form_data.notes"
          is_stacked="true"
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