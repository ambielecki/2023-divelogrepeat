<script setup>
import { ref, onMounted, computed } from "vue";
import PageProvider from "@/providers/PageProvider";
import { useRoute } from "vue-router";
import RichEditor from "@/components/FormFields/RichEditor.vue";
import ImageSelector from "@/components/Image/ImageSelector.vue";
import Revisions from "@/components/Page/Revisions.vue";
import TextInput from "@/components/FormFields/TextInput.vue";

const blog = ref({
  content: {
    title: '',
    content: '',
  }
});

const revisions = ref([]);
const show_pagination = ref(false);
const is_list_loading = ref(false);
const page = ref(1);
const pages = ref(0);

const route = useRoute();

const is_image_selector_collapsed = ref(false);
function toggleImageSelector() {
  is_image_selector_collapsed.value = !is_image_selector_collapsed.value;
}

const is_revisions_collapsed = ref(true);
function toggleRevisionSelector() {
  is_revisions_collapsed.value = !is_revisions_collapsed.value;
}

const show_editor = ref(false);
const show_revisions = computed(() => {
  return revisions.value.length > 0;
})

onMounted(() => {
  PageProvider.getBlogById(route.params.id)
      .then((result) => {
        blog.value = result.blog_page;
        show_editor.value = true;

        getRevisions();
      });
});

function handleSave() {
  console.log('saving...')
}

function getRevisions() {
  is_list_loading.value = true;
  PageProvider.getBlogRevisions(blog.value.parent_id, {page: page.value})
      .then((results) => {
        if (results) {
          page.value = parseInt(results.page);
          pages.value = parseInt(results.pages);
          revisions.value = results.blog_pages;
        }

        is_list_loading.value = false;
        show_pagination.value = true;
        window.scrollTo(0,0);
      });
}

function handlePagination(navigate_to) {
  page.value = navigate_to;

  getRevisions();
}
</script>

<template>
<div class="columns">
  <div class="column is-three-fifths">
    <div class="card">
      <div class="card-content">

        <p class="title is-4">Edit Blog Entry</p>
        <p class="subtitle is-4">Editing Version: {{ blog.revision }}</p>

        <TextInput
            input_label="Title"
            input_name="title"
            input_placeholder="Title"
            v-model="blog.content.title"
        />

        <RichEditor
            v-if="show_editor"
            v-model="blog.content.content"
            input_name="content"
            input_label="Content"
        />

        <div class="field is-horizontal">
          <div class="field-label is-normal">
            <label class="label"></label>
          </div>
          <div class="control">
            <button class="button is-info" @click="handleSave">Save</button>
          </div>
        </div>

      </div>
    </div>
  </div>

  <div class="column is-two-fifths">
    <div class="columns is-multiline">
      <div class="column is-full">
        <ImageSelector
            :show_select="false"
            :show_code="true"
            :is_collapsed="is_image_selector_collapsed"
            @toggle="toggleImageSelector"
        />
      </div>
      <div v-if="!is_list_loading" class="column is-full">
        <Revisions
          :is_collapsed="is_revisions_collapsed"
          :page_revisions="revisions"
          :selected_id="blog.id"
          :show_pagination="show_pagination"
          :page="page"
          :pages="pages"
          @toggle="toggleRevisionSelector"
        />
      </div>
    </div>

  </div>
</div>
</template>