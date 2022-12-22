<template>
  <ul class="max-h-screen space-y-3 bg-gray-900 p-2 overflow-y-auto overflow-x-hidden max-w-[65px] no-scrollbar">
    <Group v-for="group in groups"
           :id="group.id"
           :title="group.title">
    </Group>
  </ul>
</template>

<script>
import {useGroup} from "@/firebase/firebase";
import Group from "@/components/Group.vue";

export default {
  name: "Groups",
  components: {Group},
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