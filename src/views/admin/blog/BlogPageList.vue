<script setup>

</script>

<template>
<div class="columns is-multiline">
  <div class="column is-full">
    <div class="card">
      <div class="card-content is-vcentered">
        <div class="columns">
          <div class="column is-four-fifths">
            <p class="title">Blog Entries</p>
          </div>
          <div class="column is-one-fifth">
            <router-link class="button is-info" :to="{ name: 'blog_create' }">Create</router-link>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>
</template>