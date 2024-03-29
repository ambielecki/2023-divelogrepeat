<script setup>
  import { computed, onMounted, ref } from "vue";
  import ImageProvider from "@/providers/ImageProvider";
  import Pagination from "@/components/Pagination.vue";
  import ImageDetails from "@/components/Image/ImageDetails.vue";
  import ImageEditForm from "@/components/Image/ImageEditForm.vue";
  import imageProvider from "@/providers/ImageProvider";
  import { useAlertStore } from "@/stores/alert";

  const base_image_path = import.meta.env.VITE_IMAGE_URL;
  const images = ref([]);

  const sort = ref('created_at');
  const sort_direction = ref('desc');
  const limit = ref(20);
  const page = ref(1);
  const pages = ref(0);

  const is_loading = ref(true);
  const show_pagination = ref(false);

  const selected_image_id = ref(null);

  const is_editing = ref(false);

  onMounted(() => {
    getList().then(() => show_pagination.value = true);
  });

  async function getList() {
    is_loading.value = true;
    const results = await ImageProvider.getList({
      sort: sort.value,
      sort_direction: sort_direction.value,
      page: page.value,
      limit: limit.value,
    });
    if (results) {
      images.value = results.images;
      page.value = parseInt(results.page);
      pages.value = parseInt(results.pages);
      limit.value = parseInt(results.limit);
    }

    is_loading.value = false;

    return true;
  }

  function selectImage(id) {
    selected_image_id.value = id;
    is_editing.value = false;
  }

  const selected_image = computed(() => {
    if (selected_image_id.value) {
      const image = images.value.find((image) => image.id === selected_image_id.value);
      image.tag_names = image.tags.map((tag) => tag.name);

      return image;
    }

    return false;
  });

  function toggleEdit() {
    is_editing.value = !is_editing.value;
  }

  function handlePaginationNavigate(navigate_to) {
    page.value = navigate_to;
    getList();
  }

  function handleSave(image, tags) {
    imageProvider.patchImage({
      alt_tag: image.alt_tag,
      description: image.description,
      is_hero: image.is_hero,
      tags: tags,
    }, image.id)
        .then(result => {
          images.value = images.value.map(image => image.id == result.image.id ? result.image : image);
          useAlertStore().addAlert('Image updated successfully');
          is_editing.value = false;
        });
  }
</script>

<template>
  <div class="columns is-multiline">
    <div class="column is-full">
      <div class="card">
        <div class="card-content is-vcentered">
          <div class="columns">
            <div class="column is-four-fifths">
              <p class="title">Images</p>
            </div>
            <div class="column is-one-fifth">
              <router-link class="button is-info" :to="{ name: 'image_upload' }">Upload</router-link>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="column is-two-thirds">
      <div class="columns is-multiline is-mobile">
        <div v-for="image in images" class="column is-one-quarter">
          <div class="card image_item">
            <div class="card-image">
              <figure class="image">
                <img :src="base_image_path + image.public_path + '/' + image.file_name" :alt="image.alt_tag" @click="selectImage(image.id)">
              </figure>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div v-if="selected_image" class="column is-one-third">
      <div class="card">
        <div class="card-image">
          <figure class="image">
            <img :src="base_image_path + selected_image.public_path + '/' + selected_image.file_name" :alt="selected_image.alt_tag">
          </figure>
        </div>
        <div class="card-content">
          <ImageDetails v-if="!is_editing" :image="selected_image" :show_edit="true" @toggle-edit="toggleEdit"/>
          <ImageEditForm v-else :image="selected_image" @cancel="toggleEdit" @save="handleSave"/>
        </div>
      </div>
    </div>
  </div>

  <div v-if="show_pagination" class="columns">
    <div class="column">
      <Pagination :current_page="page" :pages="pages" @paginationNavigate="handlePaginationNavigate"/>
    </div>
  </div>
</template>

<style scoped>
.image_item:hover {
  box-shadow: 0 0.75em 1.5em -0.250em #3e8ed0, 0 0 0 1px #0a0a0a05;
}
</style>