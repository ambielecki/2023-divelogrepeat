<script setup>
import { onMounted, ref } from "vue";
import PageProvider from "@/providers/PageProvider";
import TextInput from "@/components/FormFields/TextInput.vue";
import RichEditor from "@/components/FormFields/RichEditor.vue";
import ImageSelector from "@/components/Image/ImageSelector.vue";

const page = ref({});

function handleSave() {
  console.log('TODO');
}

onMounted(() => {
  PageProvider.getHomePage()
      .then((results) => {
        if (results.home_page) {
          page.value = results.home_page;
        }
      });
});
</script>

<template>
  <div class="columns">
    <div v-if="page.content" class="column is-three-fifths">
      <div class="card">
        <div class="card-content">

          <p class="title is-4">Home Page Revision: {{ page.revision }}</p>
          <div class="field is-horizontal">
            <div class="field-label is-normal">
              <label class="label">Updated</label>
            </div>
            <div class="field-body">
              <div class="field">
                <div class="control">
                  {{ page.updated_at }}
                </div>
              </div>
            </div>
          </div>
          <TextInput
              input_label="Title"
              input_name="title"
              input_placeholder="Title"
              v-model="page.content.title"
          />

          <RichEditor
            v-model="page.content.content"
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
    <div v-else class="column is-three-fifths"></div>

    <div class="column is-two-fifths">
      <ImageSelector />
    </div>
  </div>
</template>