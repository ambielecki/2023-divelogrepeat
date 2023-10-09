<script setup>
import { ref } from "vue";
import ImageSelector from "@/components/Image/ImageSelector.vue";
import RichEditor from "@/components/FormFields/RichEditor.vue";
import TextInput from "@/components/FormFields/TextInput.vue";
import PageProvider from "@/providers/PageProvider";
import { useAlertStore } from "@/stores/alert";
import router from "@/router";

const blog = ref({
  content: {
    content: '',
    title: '',
  }
});

const is_image_selector_collapsed = ref(false);
function toggleImageSelector() {
  is_image_selector_collapsed.value = !is_image_selector_collapsed.value;
}

async function handleSave() {
  const response = await PageProvider.postBlogPage({
    page: blog.value,
  });

  if (response) {
    useAlertStore().addAlert('Blog Post Created Successfully');
    router.push({name: 'admin_blog_list'});
  }
}

</script>

<template>
<div class="columns">
  <div class="column is-three-fifths">
    <div class="card">
      <div class="card-content">

        <p class="title is-4">New Blog Entry</p>

        <TextInput
            input_label="Title"
            input_name="title"
            input_placeholder="Title"
            v-model="blog.content.title"
        />

        <RichEditor
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
    <ImageSelector
        :show_select="false"
        :show_code="true"
        :is_collapsed="is_image_selector_collapsed"
        @toggle="toggleImageSelector"
    />
  </div>
</div>
</template>