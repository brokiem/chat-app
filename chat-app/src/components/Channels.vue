<template>
  <main>
    <div class="bg-gray-1 h-[100%]">
      <div class="bg-gray-1 p-3">
        <span class="text-lg font-medium text-gray-700 dark:text-white">{{activeGroup?.title ?? " "}}</span>
      </div>
      <hr class="rounded">

      <ul class="w-[230px] px-2 pt-4">
        <Channel v-for="channel in channels"
                 :group-id="activeGroup.id"
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
    this.activeGroup = JSON.parse(localStorage.getItem("selectedGroup"))

    if (this.activeGroup == null) {
      this.getGroups().then(groups => {
        this.activeGroup = groups[0]

        this.subscribeChannels(this.activeGroup.id).then(channels => {
          this.channels = channels
        })
      })
    } else {
      this.subscribeChannels(this.activeGroup.id).then(channels => {
        this.channels = channels
      })
    }
  },
  mounted() {
    window.addEventListener("storage", this.onStorageChange)
  },
  beforeDestroy() {
    window.removeEventListener("storage", this.onStorageChange)
  },
  methods: {
    onStorageChange: function (event) {
      if (event.key === "selectedGroup") {
        const group = JSON.parse(event.newValue)

        if (group.id !== this.activeGroup.id) {
          this.switchGroup(group)
        }
      }
    },
    switchGroup(group) {
      this.activeGroup = group
      localStorage.setItem("selectedGroup", JSON.stringify(group))

      this.subscribeChannels(group.id).then(channels => {
        this.channels = channels
      })
    }
  }
}
</script>

<style scoped>

</style>