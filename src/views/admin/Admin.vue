<script setup>

</script>

<template>
  <div class="columns">
    <div class="column is-one-third">
      <nav class="panel">
        <p class="panel-heading">
          Home Page
        </p>
        <router-link :to="{ name: 'edit_home' }" class="navbar-item">Edit</router-link>
      </nav>
    </div>

    <div class="column is-one-third">
      <nav class="panel">
        <p class="panel-heading">
          Blog
        </p>
        <router-link :to="{ name: 'admin_blog_list' }" class="navbar-item">List</router-link>
        <router-link :to="{ name: 'blog_create' }" class="navbar-item">Create</router-link>
      </nav>
    </div>

    <div class="column is-one-third">
      <nav class="panel">
        <p class="panel-heading">
          Images
        </p>
        <router-link :to="{ name: 'image_list' }" class="navbar-item">List</router-link>
        <router-link :to="{ name: 'image_upload' }" class="navbar-item">Upload</router-link>
      </nav>
    </div>
  </div>
</template>