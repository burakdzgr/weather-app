<template>
  <div class="main-bg w-full h-full lg:h-screen flex flex-col justify-between">
    <Header/>
    <NuxtPage>
      <LoadingIndicator  />
    </NuxtPage>
    <Footer />
  </div>
</template>
<script setup>

import Header from "~/components/Header.vue";
import Footer from "~/components/Footer.vue"
import LoadingIndicator from "~/components/LoadingIndicator.vue";
</script>
<style scoped>
*{
  font-family: 'Poppins', sans-serif;
}
.main-bg {
  background: rgb(11, 12, 30);
  background: radial-gradient(circle, rgba(11, 12, 30, 1) 0%, rgba(64, 45, 103, 1) 0%, rgba(14, 12, 31, 1) 62%);
}
</style>
