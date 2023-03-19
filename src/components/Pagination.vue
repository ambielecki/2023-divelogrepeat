<script setup>
  import { computed } from "vue";

  const props = defineProps(['current_page', 'pages', 'route']);

  const is_first_page = computed(() => {
    return props.current_page === 1;
  });

  const is_last_page = computed(() => {
    return props.current_page === props.pages;
  });

  const previous_page = computed(() => {
    return props.current_page - 1;
  });

  const next_page = computed(() => {
    return props.current_page + 1;
  });

  const display = computed(() => {
    let pages = [];
    if (props.pages < 5) {
        for (let display_page = 1; display_page <= props.pages; display_page++) {
          pages.push(display_page)
        }
    }

    return {
      pages: pages,
      starting_ellipsis: false,
      ending_ellipsis: false,
    }
  });
</script>

<template>
  <nav class="pagination" role="navigation" aria-label="pagination">
    <a
        v-if="!is_first_page"
        class="pagination-previous"
        aria-label="Goto page {{ previous_page }}"
        @click="$emit('paginationNavigate', previous_page)"
    >
      Previous Page
    </a>
    <a
        v-if="!is_last_page && pages > 0"
        class="pagination-previous"
        aria-label="Goto page {{ next_page }}"
        @click="$emit('paginationNavigate', next_page)"
    >
      Next Page
    </a>
    <ul class="pagination-list">
      <li v-if="display.starting_ellipsis">
        <a
            class="pagination-link"
            aria-label="Goto page 1"
            @click="$emit('paginationNavigate', 1)"
        >
          1
        </a>
      </li>
      <li v-if="display.starting_ellipsis">
        <span class="pagination-ellipsis">&hellip;</span>
      </li>

      <li v-for="display_page in display.pages">
        <a
            class="pagination-link"
            :class="{ 'is-current': display_page === current_page }"
            aria-label="Goto page {{ display_page }}"
            @click="$emit('paginationNavigate', display_page)"
        >
          {{ display_page }}
        </a>
      </li>

      <li v-if="display.ending_ellipsis">
        <a
            class="pagination-link"
            aria-label="Goto page {{ props.pages }}"
            @click="$emit('paginationNavigate', props.pages)"
        >
          {{ props.pages }}
        </a>
      </li>
      <li v-if="display.ending_ellipsis">
        <span class="pagination-ellipsis">&hellip;</span>
      </li>
    </ul>
  </nav>
</template>