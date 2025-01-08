<template>
  <div
      class="border rounded-2xl cursor-pointer bg-white w-full xl:w-1/5 p-5"
  >
    <slot name="icon"></slot>
    <h2 class="text-3xl font-bold mt-2">{{ title }}</h2>
    <p class="text-md text-gray-500 capitalize">{{ description }}</p>
  </div>
</template>

<script>
export default {
  name: "Card",
  props: {
    title: String,
    description: String,
  },
};
</script>
