<template>
  <div class="flex mb-5">
    <div class="overflow-hidden relative w-11 h-11 bg-gray-100 rounded-full dark:bg-gray-600">
      <svg class="absolute -left-1 w-13 h-13 text-gray-400" fill="currentColor" viewBox="0 0 19 19" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clip-rule="evenodd"></path></svg>
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
    message: {
      type: String,
      required: true
    }
  }
}
</script>

<style scoped>

</style>