<template>
  <main>
    <div class="bg-gray-700/60 h-[100%]">
      <div class="flex flex-col overflow-y-auto">
        <nav class="bg-gray-700 sticky p-3 top-0 w-full z-20">
          <span class="text-lg font-medium text-gray-700 dark:text-white">{{activeChannel?.title ?? "undefined"}}</span>
        </nav>

        <div class="h-[80vh] flex flex-col overflow-y-scroll">
          <Chat v-if="isLoaded" v-for="{text, photoURL, displayName} in messages" class="mt-4"
                :author="displayName"
                :photo-u-r-l="photoURL"
                :message="text"
          ></Chat>

          <div ref="dummy"></div>
        </div>

        <form @submit.prevent="onSubmit" class="bottom-0 mb-6 ml-4 mr-4 sticky bg-[#2B313A] rounded-lg z-20">
          <input type="text" id="input-message" class="block p-3 text-sm text-gray-900 w-full outline-none rounded-lg bg-gray-50 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white" placeholder="Message" required>
        </form>
      </div>
    </div>
  </main>
</template>

<script>
import Chat from "@/components/Chat.vue";
import {useGroup, useChannel, useMessage, useAuth} from "@/firebase/firebase";

export default {
  name: "Chats",
  components: {Chat},
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
      activeChannel: null,
      messages: []
    }
  },
  created() {
    if (this.activeGroup == null) {
      this.getGroups().then(groups => {
        this.activeGroup = groups[0]

        if (this.activeChannel == null) {
          this.getChannels(this.activeGroup.id).then(channels => {
            this.activeChannel = channels[0]

            useMessage().subscribeMessages(this.activeChannel.id).then(messages => {
              this.messages = messages
              this.isLoaded = true
            })
          })
        }
      })
    }
  },
  watch: {
    messages() {
      this.$nextTick(() => {
        this.$refs?.dummy?.scrollIntoView({ behavior: "smooth" })
      })
    }
  },
  methods: {
    onSubmit() {
      const input = document.getElementById("input-message")

      this.sendMessage(this.activeChannel.id, this.user.uid, this.user.displayName, this.user.photoURL, input.value)

      input.value = ""
    }
  }
}
</script>

<style scoped>

</style>