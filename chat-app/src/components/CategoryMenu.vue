<template>
  <main>
    <div class="bg-gray-800 h-[100%]">
      <div class="bg-gray-700/40 p-3">
        <span class="text-lg font-medium text-gray-700 dark:text-white">{{activeGroup?.title ?? "undefined"}}</span>
      </div>

      <ul class="w-[220px] px-2 pt-4">
        <li class="text-white bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-md text-sm mt-0.5 px-2 py-1 dark:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700 cursor-pointer"
          v-for="channel in channels">

          {{channel.title}}
        </li>
      </ul>
    </div>
  </main>
</template>

<script>
import {useChannel, useGroup} from "@/firebase/firebase";

export default {
  name: "CategoryMenu",
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