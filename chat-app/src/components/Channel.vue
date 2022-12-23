<template>
  <li @click="selectChannel" :class="[isActive ? 'active' : '']" class="select-none text-gray-400 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-md text-sm mt-0.5 px-2 py-1.5 dark:hover:bg-gray-3/50 dark:focus:ring-gray-700 dark:border-gray-700 cursor-pointer">
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="inline w-5 h-5 mr-1 text-gray-400"><path stroke-linecap="round" stroke-linejoin="round" d="M8.625 9.75a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H8.25m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H12m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0h-.375m-13.5 3.01c0 1.6 1.123 2.994 2.707 3.227 1.087.16 2.185.283 3.293.369V21l4.184-4.183a1.14 1.14 0 01.778-.332 48.294 48.294 0 005.83-.498c1.585-.233 2.708-1.626 2.708-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0012 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018z" /></svg>
    {{this.title}}
  </li>
</template>

<script>
export default {
  name: "Channel",
  props: {
    groupId: {
      type: String,
      required: true
    },
    id: {
      type: String,
      required: true
    },
    title: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      isActive: false
    }
  },
  mounted() {
    const activeChannel = JSON.parse(localStorage.getItem("selectedChannel"))
    this.isActive = activeChannel?.id === this.id

    window.addEventListener("storage", this.onStorageChange)
  },
  beforeDestroy() {
    window.removeEventListener("storage", this.onStorageChange)
  },
  methods: {
    onStorageChange: function (event) {
      if (event.key === "selectedChannel") {
        const channel = JSON.parse(event.newValue)

        this.isActive = channel.id === this.id;
      }
    },
    selectChannel: function () {
      // set selected channel on this channel group
      let channels = localStorage.getItem("groups") !== null ? JSON.parse(localStorage.getItem("groups")) : {}
      channels = {...channels, [this.groupId]: {selectedChannel: this.id, title: this.title}}
      localStorage.setItem("groups", JSON.stringify(channels))

      localStorage.setItem("selectedChannel", JSON.stringify({
        id: this.id,
        title: this.title
      }))
      window.dispatchEvent(new StorageEvent("storage", {
        key: "selectedChannel",
        newValue: JSON.stringify({
          id: this.id,
          title: this.title
        })
      }))
    }
  }
}
</script>

<style scoped>
.active {
  @apply bg-gray-3/50 text-white;
}
</style>