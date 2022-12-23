<template>
  <li @click="selectChannel" class="select-none text-white hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-md text-sm mt-0.5 px-2 py-1.5 dark:hover:bg-gray-3/50 dark:focus:ring-gray-700 dark:border-gray-700 cursor-pointer">
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
  methods: {
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

</style>