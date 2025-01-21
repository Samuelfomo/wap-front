<script setup>

import Header from "@public/components/header.vue";
import Dashboard from "@public/components/dashboard.vue";
import Footer from "@public/components/footer.vue";
</script>

<template>
  <div class="flex flex-col min-h-screen bg-neutral-50">

    <!-- Header -->
    <Header description="service" />
    <Dashboard />
    <div class="flex-1 flex flex-col">
      <main class="flex-1 p-5 lg:p-10">
<h1 class="capitalize text-xl font-bold"> mes contacts </h1>
      </main>
    </div>
    <Footer />
  </div>
</template>

<style scoped>

</style>