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

  const is_loading = ref(true);
  const show_pagination = ref(false);

  onMounted(() => {
    getList().then(() => show_pagination.value = true);
  });

  async function getList() {
    is_loading.value = true;
    const results = await DiveLogProvider.getList({
      sort: sort.value,
      sort_direction: sort_direction.value,
      page: page.value,
      limit: limit.value,
    });
    if (results) {
      dive_logs.value = results.dive_logs;
      page.value = parseInt(results.page);
      pages.value = parseInt(results.pages);
      limit.value = parseInt(results.limit);
    }

    is_loading.value = false;

    return true;
  }

  function handlePaginationNavigate(navigate_to) {
    page.value = navigate_to;
    getList();
  }
</script>

<template>
  <div class="columns is-mobile">
    <div class="column">
      <div class="card">
        <div class="card-content">
          <div class="columns is-multiline is-vcentered is-mobile">
            <div class="column is-half-mobile">
              <label class="label">Logs Per Page</label>
              <div class="control">
                <div class="select">
                  <select v-model="limit" @change="getList">
                    <option>10</option>
                    <option>20</option>
                    <option>50</option>
                    <option>100</option>
                  </select>
                </div>
              </div>
            </div>

            <div class="column is-half-mobile">
              <label class="label">Sort Direction</label>
              <div class="control">
                <div class="select">
                  <select v-model="sort_direction" @change="getList">
                    <option value="desc">Descending</option>
                    <option value="asc">Ascending</option>
                  </select>
                </div>
              </div>
            </div>

            <div class="column is-hidden-mobile"></div>

            <div class="column is-half-mobile">
              <router-link class="button is-info" :to="{ name: 'dive_log_create' }">Log New Dive</router-link>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>

  <div class="columns is-multiline dive_log_list">
    <TransitionGroup v-if="!is_loading">
      <div v-for="dive_log in dive_logs" :key=dive_log.dive_number class="column is-12">
        <LogListItem :dive_log="dive_log" />
      </div>
    </TransitionGroup>
    <Transition>
      <div v-if="is_loading" class="column is-12">
        <LoadingCard />
      </div>
    </Transition>
  </div>
  <div v-if="show_pagination" class="columns">
    <div class="column">
      <Pagination :current_page="page" :pages="pages" route="dive_log_view" @paginationNavigate="handlePaginationNavigate"/>
    </div>
  </div>
</template>