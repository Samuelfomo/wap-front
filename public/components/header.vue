<template>
  <header class="bg-white shadow p-6 flex justify-between items-center border-b-2 w-full flex-wrap">
    <div class="text-xl font-bold text-blue-600 ">WAP</div>
    <h1 class="text-2xl font-semibold">Welcome</h1>
<!--    <div class="text-sm text-gray-700 flex flex-row"> <img src="@public/favicon.ico" alt="image" class="rounded-full border"> hello@imediatis.net</div>-->
    <div class="text-sm text-gray-700 flex"> <img src="@public/favicon.ico" alt="image" class="rounded-full border">
      <select>
        <option class="p-5">hello@imediatis.net</option>
        <option class="p-5">Settings</option>
        <option class="p-16">Logout</option>
      </select>
      </div>
  </header>
</template>

<script>
export default {
  name: "Header",
};
</script>