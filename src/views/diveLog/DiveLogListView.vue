<script setup>
  import { onMounted, ref } from "vue";
  import DiveLogProvider from "../../providers/DiveLogProvider";
  import LogListItem from "../../components/DiveLog/LogListItem.vue";
  import Pagination from "../../components/Pagination.vue";
  import LoadingCard from "../../components/LoadingCard.vue";

  const dive_logs = ref([]);
  const sort = ref('dive_number');
  const sort_direction = ref('desc');
  const limit = ref(20);
  const page = ref(1);
  const pages = ref(0);

  const is_loading = ref(true)

  onMounted(() => {
    getList();
  });

  function getList() {
    is_loading.value = true;
    DiveLogProvider.getList({
      sort: sort.value,
      sort_direction: sort_direction.value,
      page: page.value,
      limit: limit.value,
    })
        .then((results) => {
          dive_logs.value = results.dive_logs;
          page.value = results.page;
          pages.value = results.pages;
          limit.value = results.limit;

          is_loading.value = false;
        });
  }

  function handlePaginationNavigate(navigate_to) {
    page.value = navigate_to;
    getList();
  }
</script>

<template>
  <div class="columns is-multiline dive_log_list">
    <TransitionGroup v-if="!is_loading">
      <div v-for="dive_log in dive_logs" :key=dive_log.dive_number class="column is-12">
        <LogListItem  :dive_log="dive_log" />
      </div>
    </TransitionGroup>
    <Transition>
      <div v-if="is_loading" class="column is-12">
        <LoadingCard />
      </div>
    </Transition>
  </div>
  <div class="columns">
    <div class="column">
      <Pagination :current_page="page" :pages="pages" route="dive_log_view" @paginationNavigate="handlePaginationNavigate"/>
    </div>
  </div>
</template>