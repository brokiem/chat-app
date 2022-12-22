<template>
  <main>
    <div class="bg-gray-700/60 h-[100%]">
      <div class="h-screen flex  flex-col overflow-y-auto">
        <nav class="bg-gray-700 sticky p-3 top-0 w-full z-20">
          <span class="text-lg font-medium text-gray-700 dark:text-white">{{activeChannel?.title ?? "undefined"}}</span>
        </nav>

        <div class="flex flex-col ml-6 mt-5">
          <Chat v-if="isLoaded" v-for="{text, photoURL, displayName} in messages"
                :author="displayName"
                :photo-u-r-l="photoURL"
                :message="text"
          ></Chat>

          <div ref="dummy"></div>
        </div>

        <div class="bottom-0 pb-6 ml-4 mr-4 sticky bg-[#2B313A] rounded-t-lg z-20">
          <form @submit.prevent="onSubmit">
            <input type="text" id="input-message" class="block p-3 text-sm text-gray-900 w-full outline-none rounded-lg bg-gray-50 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white" placeholder="Message" required>
          </form>
        </div>
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
  methods: {
    onSubmit() {
      const input = document.getElementById("input-message")

      this.sendMessage(this.activeChannel.id, this.user.uid, this.user.displayName, this.user.photoURL, input.value)

      this.$refs.dummy.scrollIntoView({ behavior: "smooth" })

      input.value = ""
    }
  }
}
</script>

<style scoped>

</style>