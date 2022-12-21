<script>
import Groups from "@/components/Groups.vue";
import Chats from "@/components/Chats.vue";
import CategoryMenu from "@/components/CategoryMenu.vue";

export default {
  name: "MainView",
  components: {CategoryMenu, Chats, Groups}
}
</script>

<template>
  <div class="relative flex">
    <Groups/>
    <CategoryMenu/>
    <Chats class="grow"/>
  </div>
</template>

<style scoped>

</style>