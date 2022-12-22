<script lang="ts">
import {useAuth} from "@/firebase/firebase";
import LoginCard from "@/components/LoginCard.vue";

export default {
  name: "HomeView",
  components: {LoginCard},
  setup() {
    const { user, isLogin, signOut } = useAuth()
    return { user, isLogin, signOut }
  }
}
</script>

<template>
  <main>
    <LoginCard v-if="!isLogin" />

    <div v-if="isLogin" class="flex flex-col items-center justify-center h-screen">
      <h1>Signed in as {{user.displayName}}</h1>
      <div class="mt-2">
        <router-link to="/app" type="button" class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">
          Launch app
        </router-link>
        <button @click="signOut" type="button" class="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2 mr-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900">
          Sign out
        </button>
      </div>
    </div>
  </main>
</template>
