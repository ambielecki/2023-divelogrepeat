<script setup>
  import { computed, ref, onMounted } from "vue";
  import DiveLogProvider from "@/providers/DiveLogProvider";
  import { useRoute } from "vue-router";
  import LoadingCard from "@/components/LoadingCard.vue";
  import LogView from "@/components/DiveLog/LogView.vue";
  import LogForm from "@/components/DiveLog/LogForm.vue";

  const route = useRoute();
  const is_loading = ref(true);

  onMounted(() => {
    getDetails();
  });

  const dive_log = ref({});
  let original_log = {};

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

  const is_editting = ref(false);

  function handleEdit() {
    original_log = JSON.parse(JSON.stringify(dive_log.value))
    toggleEdit();
  }

  async function handleSave() {
    is_loading.value = true;

    const result = await DiveLogProvider.putUpdateDetails(dive_log.value, dive_log.value.id);

    if (result) {
      dive_log.value = result.dive_log;
    }

    toggleEdit();
    is_loading.value = false;
  }

  function handleCancel() {
    dive_log.value = original_log;
    toggleEdit();
  }

  function toggleEdit() {
    is_editting.value = !is_editting.value;
  }
</script>

<template>
  <div class="columns">
    <div v-if="is_loading" class="column is-full">
      <LoadingCard />
    </div>
    <LogView v-if="!is_loading && !is_editting" :dive_log="dive_log" @edit="handleEdit"></LogView>
    <LogForm v-if="!is_loading && is_editting" :dive_log="dive_log" @cancel="handleCancel" @save="handleSave"></LogForm>
  </div>
</template>

<style scoped>
</style>