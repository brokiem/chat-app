<template>
  <div class="flex mb-5">
    <div class="overflow-hidden relative w-11 h-11 bg-gray-100 rounded-full dark:bg-gray-600">
      <img class="absolute h-full w-full object-cover" :src="photoURL" alt="avatar">
    </div>

    <div class="flex flex-nowrap flex-col space-y-2">
      <span class="ml-4 text-lg leading-none">{{author}}</span>
      <span class="ml-4">{{message}}</span>
    </div>
  </div>
</template>

<script>
export default {
  name: "Chat",
  props: {
    author: {
      type: String,
      required: true
    },
    photoURL: {
      type: String,
      required: true
    },
    message: {
      type: String,
      required: true
    }
  }
}
</script>

<style scoped>

</style>