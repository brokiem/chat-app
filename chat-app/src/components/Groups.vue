<template>
  <ul class="max-h-screen space-y-3 bg-gray-900 p-2 overflow-y-auto overflow-x-hidden max-w-[65px] no-scrollbar">
    <li class="bg-blue-600 rounded-lg w-12 h-12 flex justify-center items-center hover:bg-blue-500 transition duration-200 cursor-pointer"
        v-for="group in groups">

      {{group?.title.slice(0, 2) ?? "un"}}
    </li>

  </ul>
</template>

<script>
import {useGroup} from "@/firebase/firebase";

export default {
  name: "Groups",
  setup() {
    const { subscribeGroups } = useGroup()

    return { subscribeGroups };
  },
  data() {
    return {
      groups: []
    }
  },
  created() {
    this.subscribeGroups().then(groups => {
      this.groups = groups
    })
  }
}
</script>

<style scoped>

</style>