<script lang="ts">
import {useAuth} from "@/firebase/firebase";
import LoginCard from "@/components/LoginCard.vue";

export default {
  name: "HomeView",
  components: {LoginCard},
  setup() {
    const { isLogin } = useAuth()
    return { isLogin }
  }
}
</script>

<template>
  <main>
    <LoginCard v-if="!isLogin" />

    <div v-else class="flex items-center justify-center h-screen">
      <button type="button" class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">
        Cotinue to app
      </button>
    </div>
  </main>
</template>
