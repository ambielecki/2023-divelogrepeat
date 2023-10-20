<script setup>
import { ref, nextTick, onMounted, computed } from "vue";
import PageProvider from "@/providers/PageProvider";
import { useRoute } from "vue-router";
import RichEditor from "@/components/FormFields/RichEditor.vue";
import ImageSelector from "@/components/Image/ImageSelector.vue";
import Revisions from "@/components/Page/Revisions.vue";
import TextInput from "@/components/FormFields/TextInput.vue";
import RadioInput from "@/components/FormFields/RadioInput.vue";
import { useAlertStore } from "@/stores/alert";
import router from "@/router";

const blog = ref({
  content: {
    title: '',
    content: '',
  },
  is_published: 0,
  is_active: 0,
  parent_id: 0,
});

const published_values = {
  Yes: 1,
  No: 0,
}

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

const is_revisions_collapsed = ref(false);
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

async function handleSave() {
  const response = await PageProvider.postBlogPageRevision({
        page: blog.value,
      },
      blog.value.parent_id
  );

  if (response) {
    useAlertStore().addAlert('New Blog Post Revision Created');
    router.push({name: 'admin_blog_list'});
  }
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

async function handleSelectRevision(revision_id) {
  show_editor.value = false;
  blog.value = revisions.value.find((revision) => revision.id === revision_id);
  await nextTick();
  show_editor.value = true;
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
        <p class="subtitle is-4">Editing Revision: {{ blog.revision }}
          <span v-if="!blog.is_active" class="has-text-danger"> - This Version Is Not Active!</span>
          <span v-else class="has-text-success"> - Active Version!</span>
        </p>

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
            ref="editor"
        />

        <RadioInput
          input_name="is_published"
          input_label="Is Published"
          :input_values="published_values"
          v-model="blog.is_published"
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
          @select_revision="handleSelectRevision"
        />
      </div>
    </div>

  </div>
</div>
</template>