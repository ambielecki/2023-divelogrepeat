<script setup>
  import { computed, ref, onMounted } from "vue";
  import DiveLogProvider from "@/providers/DiveLogProvider";
  import { useRoute } from "vue-router";
  import LoadingCard from "@/components/LoadingCard.vue";
  import LogView from "@/components/DiveLog/LogView.vue";
  import LogForm from "@/components/DiveLog/LogForm.vue";

  const route = useRoute();
  const is_loading = ref(true);
  const max_dive = ref(0);

  onMounted(() => {
    getDetails();

    DiveLogProvider.getMaxDive()
        .then((response) => {
          if (response?.max_dive) {
            max_dive.value = response.max_dive;
          }
        });
  });

  const dive_log = ref({});

  async function getDetails() {
    is_loading.value = true;

    const result = await DiveLogProvider.getDetails(
        route.params.id
    );

    if (result) {
        dive_log.value = result.dive_log;
    }

    is_loading.value = false
  }

  const is_editing = ref(false);

  function handleEdit() {
    toggleEdit();
  }

  async function handleSave(form_data) {
    dive_log.value = form_data;
    is_loading.value = true;

    const result = await DiveLogProvider.putUpdateDetails(dive_log.value, dive_log.value.id);

    if (result) {
      dive_log.value = result.dive_log;
    }

    toggleEdit();
    is_loading.value = false;
  }

  function handleCancel() {
    toggleEdit();
  }

  function toggleEdit() {
    is_editing.value = !is_editing.value;
  }
</script>

<template>
  <div class="columns">
    <div v-if="is_loading" class="column is-full">
      <LoadingCard />
    </div>
    <LogView v-if="!is_loading && !is_editing" :dive_log="dive_log" @edit="handleEdit"></LogView>
    <LogForm v-if="!is_loading && is_editing" :dive_log="dive_log" :max_dive="max_dive" @cancel="handleCancel" @save="handleSave"></LogForm>
  </div>
</template>

<style scoped>
</style>