<template>
<header class="header border-b border-[#474359]">
  <div class="container mx-auto px-10 md:px-0">
    <div class="header-items flex items-center justify-between py-4">
      <div class="header-logo">
        <NuxtLink to="/" class="text-4xl font-bold text-white">chex.</NuxtLink>
      </div>
      <div class="user-action flex">
        <SearchBar class="ml-4 sm:ml-0"/>
        <getCurrentLocation class="ml-2" />
      </div>
    </div>
  </div>
</header>
</template>

<script setup>
import SearchBar from "~/components/SearchBar.vue"
import getCurrentLocation from "~/components/getCurrentLocation.vue";
</script>

<style scoped>

</style>