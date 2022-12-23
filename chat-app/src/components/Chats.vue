<template>
  <main>
    <div class="bg-gray-2 h-[100%]">
      <div class="flex flex-col overflow-y-auto">
        <nav class="bg-gray-1 sticky p-3 top-0 w-full z-20">
          <span class="select-none text-lg font-medium text-gray-700 dark:text-white">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="inline w-6 h-6 mr-1 text-gray-400"><path stroke-linecap="round" stroke-linejoin="round" d="M20.25 8.511c.884.284 1.5 1.128 1.5 2.097v4.286c0 1.136-.847 2.1-1.98 2.193-.34.027-.68.052-1.02.072v3.091l-3-3c-1.354 0-2.694-.055-4.02-.163a2.115 2.115 0 01-.825-.242m9.345-8.334a2.126 2.126 0 00-.476-.095 48.64 48.64 0 00-8.048 0c-1.131.094-1.976 1.057-1.976 2.192v4.286c0 .837.46 1.58 1.155 1.951m9.345-8.334V6.637c0-1.621-1.152-3.026-2.76-3.235A48.455 48.455 0 0011.25 3c-2.115 0-4.198.137-6.24.402-1.608.209-2.76 1.614-2.76 3.235v6.226c0 1.621 1.152 3.026 2.76 3.235.577.075 1.157.14 1.74.194V21l4.155-4.155" /></svg>
            {{activeChannel?.title ?? " "}}</span>
        </nav>

        <hr class="rounded">

        <div class="h-[calc(100vh-98px)] overflow-y-scroll">
          <div class="mt-5"></div>

          <Chat v-if="isLoaded" v-for="({uid, text, photoURL, displayName}, index) in messages" :class="[(index > 0) && messages[index - 1].uid !== uid ? 'mt-4' : '']" class="fade-in"
                :headless="(index > 0) && messages[index - 1].uid === uid"
                :author="displayName"
                :photo-u-r-l="photoURL"
                :message="text"
          ></Chat>

          <div ref="dummy" class="mt-6"></div>
        </div>

        <EmojiPicker v-if="showEmojiPicker" :native="true" display-recent="true" @select="onEmojiSelect" class="fade-in duration-300 absolute right-7 bottom-16"/>

        <div class="bg-gray-1 dark:bg-gray-1">
          <form @submit.prevent="onSubmit" class="bottom-0 ml-5 mr-5 sticky bg-gray-1 dark:bg-gray-1 rounded-lg z-20">
            <input type="text" id="input-message" class="block p-3 text-sm text-gray-900 w-full outline-none rounded-lg bg-gray-1 dark:bg-gray-1 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white" placeholder="Type a message" autocomplete="off" required>
            <div class="absolute right-0 items-center inset-y-0 hidden sm:flex">
              <button type="button" class="inline-flex items-center justify-center rounded-full h-10 w-10 transition duration-500 ease-in-out text-gray-500 hover:bg-gray-300 focus:outline-none">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" class="h-6 w-6 text-gray-600">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13"></path>
                </svg>
              </button>
              <button type="button" @click="showEmojiPicker = !showEmojiPicker" class="inline-flex items-center justify-center rounded-full h-10 w-10 transition duration-500 ease-in-out text-gray-500 hover:bg-gray-300 focus:outline-none">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" class="h-6 w-6 text-gray-600">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                </svg>
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </main>
</template>

<script>
import Chat from "@/components/Chat.vue";
import {useGroup, useChannel, useMessage, useAuth} from "@/firebase/firebase";
import EmojiPicker from 'vue3-emoji-picker'

export default {
  name: "Chats",
  components: {Chat, EmojiPicker},
  setup() {
    const { user } = useAuth()
    const { sendMessage, subscribeMessages } = useMessage()
    const { getChannels } = useChannel()
    const { getGroups } = useGroup()

    return { user, getGroups, getChannels, sendMessage, subscribeMessages}
  },
  data() {
    return {
      isLoaded: false,
      activeGroup: null,
      activeChannel: {
        id: null,
        title: null
      },
      messages: [],
      showEmojiPicker: false
    }
  },
  created() {
    this.activeGroup = JSON.parse(localStorage.getItem("selectedGroup"))
    this.activeChannel = JSON.parse(localStorage.getItem("selectedChannel"))

    if (this.activeChannel == null) {
      this.getGroups().then(groups => {
        this.activeGroup = groups[0]

        if (this.activeChannel == null) {
          this.getChannels(this.activeGroup.id).then(channels => {
            this.activeChannel = channels[0]

            this.subscribeMessages(this.activeChannel.id).then(messages => {
              this.messages = messages
              this.isLoaded = true
            })
          })
        }
      })
    } else {
      this.subscribeMessages(this.activeChannel.id).then(messages => {
        this.messages = messages
        this.isLoaded = true
      })
    }
  },
  mounted() {
    window.addEventListener("storage", this.onStorageChange)
  },
  beforeDestroy() {
    window.removeEventListener("storage", this.onStorageChange)
  },
  watch: {
    messages() {
      this.$nextTick(() => {
        this.$refs?.dummy?.scrollIntoView({ behavior: "smooth" })
      })
    },
  },
  methods: {
    onEmojiSelect(event) {
      const input = document.getElementById("input-message")
      input.value += event.i

      input.focus()
    },
    onSubmit() {
      const input = document.getElementById("input-message")

      this.sendMessage(this.activeChannel.id, this.user.uid, this.user.displayName, this.user.photoURL, input.value)

      input.value = ""
    },
    onStorageChange: function (event) {
      if (event.key === "selectedChannel") {
        const channel = JSON.parse(event.newValue)

        if (channel.id !== this.activeChannel.id) {
          this.switchChannel(channel)
        }
      }
    },
    switchChannel(channel) {
      this.activeChannel = channel
      this.subscribeMessages(channel.id).then(messages => {
        this.messages = messages
      })
    }
  }
}
</script>

<style scoped>

</style>