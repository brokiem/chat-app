<template>
  <div class="my-1">
    <div v-if="!headless" class="flex ml-5">
      <div class="overflow-hidden relative w-11 h-11 rounded-full">
        <img class="absolute h-full w-full object-cover" :src="photoURL" alt="avatar">
      </div>

      <div class="flex flex-nowrap flex-col space-y-1">
        <span class="ml-4 text-md leading-none">{{author}}
          <span class="ml-3 leading-none text-xs">{{dateFormat + ' ' + timeFormat}}</span>
        </span>

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

    <div v-if="headless" class="flex ml-5" @mouseover="isHovered = true" @mouseout="isHovered = false">
      <div class="overflow-hidden flex items-center relative w-11">
        <span v-if="isHovered" class="inline ml-2 leading-none text-xs">{{timeFormat}}</span>
      </div>

      <div class="ml-4">
        <div class="flex flex-col max-w-[65vw] items-start">
          <div>
            <span class="px-3 py-1.5 rounded-md inline-block bg-gray-4 text-white/90">
              {{message}}
            </span>
          </div>
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
    },
    createdAt: {
      required: true
    }
  },
  setup(props) {
    // compensation for firestore timestamp not immediately updated
    const d = props.createdAt == null ? new Date() : props.createdAt.toDate()
    const timeFormat = [
      d.getHours().toString().length <= 1 ? '0' + d.getHours() : d.getHours(),
      d.getMinutes().toString().length <= 1 ? '0' + d.getMinutes() : d.getMinutes()
    ].join(':')

    const dateFormat = [
      d.getMonth() + 1,
      d.getDate(),
      d.getFullYear()
    ].join('/')

    return {dateFormat, timeFormat}
  },
  data() {
    return {isHovered: false}
  }
}
</script>

<style scoped>

</style>