<script setup>

import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import Pagination from "@/components/Pagination.vue";

const props = defineProps(['is_collapsed', 'page_revisions', 'selected_id', 'show_pagination', 'page', 'pages']);
const emit = defineEmits(['navigate', 'toggle', 'select_revision']);

function handlePaginationNavigate(page) {
  console.log(page);
}

function selectRevision(id) {
  emit('select_revision', id)
}
</script>

<template>
<div class="columns is-multiline">
  <div class="column is-full">
    <div class="card">
      <div class="card-content">
        <p class="title">
          Revisions
          <span @click="$emit('toggle')" class="icon is-small is-pulled-right toggle_span">
            <font-awesome-icon v-if="is_collapsed" :icon="['fas', 'angle-down']" />
            <font-awesome-icon v-else :icon="['fas', 'angle-up']" />
          </span>
        </p>
        <div v-show="!is_collapsed" class="content">
          <div
              v-for="page_revision in page_revisions"
              :class="{ notification: true, 'has-background-success-light': page_revision.id === selected_id }"
              @click="selectRevision(page_revision.id)"
          >
            <b>Revision {{ page_revision.revision }}:</b> {{ $filters.formatDate(page_revision.created_at) }}
          </div>
          <div v-if="show_pagination" class="columns">
            <div class="column">
              <Pagination :current_page="page" :pages="pages"
                          @paginationNavigate="handlePaginationNavigate"/>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>

  <div v-if="!is_collapsed" class="column is-full">
  </div>
</div>
</template>

<style scoped>
.toggle_span {
  margin-top: .5rem;

  > svg {
    height: 1.5rem;
  }
}

.notification:hover {
  box-shadow: 0 0.75em 1.5em -0.250em #3e8ed0, 0 0 0 1px #0a0a0a05;
}
</style>