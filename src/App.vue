<script setup lang="ts">
import BaseNavbar from './components/BaseNavbar.vue';
import BaseFooter from './components/BaseFooter.vue';
</script>

<template>
  <base-navbar/>
    <main class="pb-5">
      <BContainer>
        <router-view/>
      </BContainer>
    </main>
  <base-footer/>
</template>

<style scoped>
</style>
