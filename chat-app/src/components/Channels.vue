<template>
  <main>
    <div class="bg-gray-800 h-[100%]">
      <div class="bg-gray-700/40 p-3">
        <span class="text-lg font-medium text-gray-700 dark:text-white">{{activeGroup?.title ?? "undefined"}}</span>
      </div>

      <ul class="w-[220px] px-2 pt-4">
        <Channel v-for="channel in channels"
                 :id="channel.id"
                 :title="channel.title">
        </Channel>
      </ul>
    </div>
  </main>
</template>

<script>
import {useChannel, useGroup} from "@/firebase/firebase";
import Channel from "@/components/Channel.vue";

export default {
  name: "Channels",
  components: {Channel},
  setup() {
    const { subscribeChannels } = useChannel()
    const { getGroups } = useGroup()

    return { subscribeChannels, getGroups };
  },
  data() {
    return {
      activeGroup: null,
      channels: []
    }
  },
  created() {
    if (this.activeGroup == null) {
      this.getGroups().then(groups => {
        this.activeGroup = groups[0]

        this.subscribeChannels(this.activeGroup.id).then(channels => {
          this.channels = channels
        })
      })
    }
  }
}
</script>

<style scoped>

</style>