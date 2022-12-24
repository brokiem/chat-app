<template>
  <li @click="selectChannel" @mouseover="showDeleteButton = true" @mouseout="showDeleteButton = false" :class="[isActive ? 'active' : '']" class="select-none text-gray-400 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-md text-sm mt-0.5 px-2 py-1.5 dark:hover:bg-gray-3/50 dark:focus:ring-gray-700 dark:border-gray-700 cursor-pointer">
    <span v-if="showDeleteButton && isChannelGroupOwned" @click="deleteChannel" class="inline float-right w-5 h-5">
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="text-red-500 inline w-5 h-5">
        <path stroke-linecap="round" stroke-linejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
      </svg>
    </span>

    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="inline w-5 h-5 mr-1 text-gray-400"><path stroke-linecap="round" stroke-linejoin="round" d="M8.625 9.75a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H8.25m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H12m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0h-.375m-13.5 3.01c0 1.6 1.123 2.994 2.707 3.227 1.087.16 2.185.283 3.293.369V21l4.184-4.183a1.14 1.14 0 01.778-.332 48.294 48.294 0 005.83-.498c1.585-.233 2.708-1.626 2.708-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0012 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018z" /></svg>
    {{this.title}}
  </li>
</template>

<script>
import {useAuth, useChannel} from "@/firebase/firebase";

export default {
  name: "Channel",
  props: {
    group: {
      type: Object,
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
  setup() {
    const { isLogin, user } = useAuth()
    const { deleteChannel } = useChannel()

    return {isLogin, user, deleteChannel}
  },
  data() {
    return {
      isActive: false,
      showDeleteButton: false,
      isChannelGroupOwned: false
    }
  },
  mounted() {
    this.checkPermission()

    const activeChannel = JSON.parse(localStorage.getItem("selectedChannel"))
    this.isActive = activeChannel?.id === this.id

    window.addEventListener("storage", this.onStorageChange)
  },
  beforeDestroy() {
    window.removeEventListener("storage", this.onStorageChange)
  },
  methods: {
    checkPermission() {
      if (this.user == null) {
        this.$watch('user', (newVal) => {
          if (newVal != null) {
            this.isChannelGroupOwned = (newVal.uid === this?.group?.owner)
          }
        })
      } else {
        this.isChannelGroupOwned = (this.user.uid === this?.group?.owner)
      }
    },
    onStorageChange: function (event) {
      if (event.key === "selectedChannel") {
        const channel = JSON.parse(event.newValue)

        this.isActive = channel.id === this.id;
      }
    },
    deleteChannel: function () {
      this.deleteChannel(this.id)
    },
    selectChannel: function () {
      // set selected channel on this channel group
      let channels = localStorage.getItem("groups") !== null ? JSON.parse(localStorage.getItem("groups")) : {}
      channels = {...channels, [this.group.id]: {selectedChannel: this.id, title: this.title}}
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

      // focus to input message when switching channel
      const input = document.getElementById("input-message")
      input.focus()
    }
  }
}
</script>

<style scoped>
.active {
  @apply bg-gray-3/50 text-white;
}
</style>