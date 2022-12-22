<script>
import Groups from "@/components/Groups.vue";
import Chats from "@/components/Chats.vue";
import Channels from "@/components/Channels.vue";

export default {
  name: "MainView",
  components: {Channels, Chats, Groups}
}
</script>

<template>
  <div class="relative flex h-screen">
    <Groups/>
    <Channels/>
    <Chats class="grow"/>
  </div>
</template>

<style scoped>

</style>