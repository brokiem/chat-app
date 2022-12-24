<template>
  <ul class="max-h-screen space-y-2 bg-gray-2 p-2 overflow-y-auto overflow-x-hidden max-w-[65px] no-scrollbar">
    <Group v-for="group in groups"
           :id="group.id"
           :title="group.title"
           :owner="group.owner"
    ></Group>

    <li><hr class="rounded"></li>

    <AddServer/>
  </ul>
</template>

<script>
import {useGroup} from "@/firebase/firebase";
import Group from "@/components/Group.vue";
import AddServer from "@/components/AddServer.vue";

export default {
  name: "Groups",
  components: {AddServer, Group},
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