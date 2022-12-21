<template>
  <main>
    <div class="bg-gray-800 h-[100%]">
      <div class="bg-gray-700/40 p-3">
        <span class="text-lg font-medium text-gray-700 dark:text-white">01 Test Area</span>
      </div>

      <ul class="w-[220px] px-2 pt-4">
        <li class="text-white bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-md text-sm mt-0.5 px-2 py-1 dark:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700 cursor-pointer">

          General
        </li>
        <li class=" bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-md mt-0.5 text-sm px-2 py-1 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700 cursor-pointer">

          Working
        </li>
        <li class=" bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-md mt-0.5 text-sm px-2 py-1 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700 cursor-pointer">

          Talking Rubish
        </li>
      </ul>
    </div>
  </main>
</template>

<script>
export default {
  name: "CategoryMenu"
}
</script>

<style scoped>

</style>