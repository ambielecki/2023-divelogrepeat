<script setup>
  import { computed } from "vue";

  const props = defineProps(['image', 'show_edit']);
  const emit = defineEmits(['toggle-edit']);

  const show_tags = computed(() => {
    return props.image.tags.length > 0;
  });

  function handleClick() {
    emit('toggle-edit')
  }
</script>

<template>
  <div class="content">
    <p class="title is-3">{{ image.alt_tag }}</p>
    <p>{{ image.description }}</p>
    <div v-if="show_tags" class="tags are-medium">
      <span v-for="tag in image.tags" class="tag is-info is-light">{{ tag.name }}</span>
    </div>
    <button v-if="show_edit" class="button is-info" @click="handleClick">Edit</button>
  </div>
</template>