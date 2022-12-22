<template>
  <li @click="selectGroup" class="select-none bg-blue-600 rounded-lg w-12 h-12 flex justify-center items-center hover:bg-blue-500 transition duration-200 cursor-pointer">
    {{title.slice(0, 2).toUpperCase() ?? "un"}}
  </li>
</template>

<script>
import {useGroup, useChannel} from "@/firebase/firebase";

export default {
  name: "Group",
  props: {
    id: {
      type: String,
      required: true
    },
    title: {
      type: String,
      required: true
    }
  },
  setup() {
    const { getGroup } = useGroup()
    const { getChannels } = useChannel()
    return { getGroup, getChannels }
  },
  methods: {
    selectGroup: function () {
      localStorage.setItem("selectedGroup", JSON.stringify({
        id: this.id,
        title: this.title
      }))
      window.dispatchEvent(new StorageEvent("storage", {
        key: "selectedGroup",
        newValue: JSON.stringify({
          id: this.id,
          title: this.title
        })
      }))

      // return to the last channel that was selected in this group
      let channels = localStorage.getItem("groups") !== null ? JSON.parse(localStorage.getItem("groups")) : {}
      const selectedChannel = channels[this.id] !== undefined ? channels[this.id].selectedChannel : null
      const title = channels[this.id] !== undefined ? channels[this.id].title : null

      // if there is no selected channel, select the first channel in the group
      if (selectedChannel !== null && title !== null) {
        this.selectChannel(selectedChannel, title)
      } else {
        this.getGroup(this.id).then(group => {
          this.getChannels(group.id).then(channels => {
            this.selectChannel(channels[0].id, channels[0].title)
          })
        })
      }
    },
    selectChannel(channel, title) {
      localStorage.setItem("selectedChannel", JSON.stringify({
        id: channel,
        title: title
      }))
      window.dispatchEvent(new StorageEvent("storage", {
        key: "selectedChannel",
        newValue: JSON.stringify({
          id: channel,
          title: title
        })
      }))
    }
  }
}
</script>

<style scoped>

</style>