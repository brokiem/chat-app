<template>
  <div class="my-1">
    <div v-if="!headless" class="flex ml-5">
      <div class="overflow-hidden relative w-11 h-11 rounded-full">
        <img class="absolute h-full w-full object-cover" :src="photoURL" alt="avatar">
      </div>

      <div class="flex flex-nowrap flex-col space-y-1">
        <span class="ml-4 text-md leading-none">{{author}}</span>
        <div class="ml-4">
          <div class="flex flex-col space-y-2 max-w-[65vw] items-start">
            <div>
              <span class="px-3 py-1.5 rounded-md inline-block rounded-tl-none bg-gray-4 text-white/90">
                {{message}}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div v-if="headless" class="ml-20 flex flex-nowrap flex-col">
      <div class="flex flex-col max-w-[65vw] items-start">
        <div>
          <span class="px-3 py-1.5 rounded-md inline-block bg-gray-4 text-white/90">
            {{message}}
          </span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Chat",
  props: {
    headless: {
      type: Boolean,
      default: false
    },
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