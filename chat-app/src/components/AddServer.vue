<template>
  <li @click="showModal(true)" class="select-none bg-gray-700 hover:text-gray-200 rounded-full w-12 h-12 flex justify-center items-center hover:bg-blue-500 transition duration-200 cursor-pointer">
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
      <path stroke-linecap="round" stroke-linejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
    </svg>
  </li>

  <div v-if="isModalShown" id="modal" tabindex="-1" aria-hidden="true" class="fade-in fixed flex items-center justify-center z-50 w-full p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-modal md:h-full">
    <div class="relative z-10" aria-labelledby="modal-title" role="dialog" aria-modal="true">
      <div class="fixed inset-0 bg-gray-1/80 transition-opacity"></div>

      <div class="fixed inset-0 z-10 overflow-y-auto">
        <div class="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
          <div class="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
            <div class="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
              <h3 class="text-xl text-center font-medium leading-6 text-gray-900" id="modal-title">Create a server</h3>
              <div class="mt-8">
                <form @submit.prevent>
                  <label for="server-input" class="text-gray-900">Server name</label>
                  <div class="relative w-full">
                    <input type="text" id="server-input" class="bg-gray-50 border border-gray-400 text-gray-900 text-sm rounded-md outline-none block w-full p-2.5 dark:placeholder-gray-400" placeholder="Your server name" autocomplete="off" required>
                  </div>
                </form>
              </div>
            </div>
            <div class="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
              <button type="button" @click="create" class="inline-flex w-full justify-center rounded-md border border-transparent bg-blue-600 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 sm:ml-3 sm:w-auto sm:text-sm">Create</button>
              <button type="button" @click="showModal(false)" class="mt-3 inline-flex w-full justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-base font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-300 focus:ring-offset-2 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm">Cancel</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {useGroup, useAuth} from "@/firebase/firebase";

export default {
  name: "AddServer",
  setup() {
    const {createGroup} = useGroup()
    const {user} = useAuth()

    return {createGroup, user}
  },
  data() {
    return {isModalShown: false}
  },
  methods: {
    create() {
      const serverInputEl = document.getElementById("server-input")

      if (this.isStringEmpty(serverInputEl.value)) {
        return
      }

      this.createGroup(this.user.uid, serverInputEl.value, "")

      serverInputEl.value = ""
      this.showModal(false)
    },
    showModal(show) {
      this.isModalShown = show;

      // hack (idk why)
      setTimeout(() => {
        const serverInputEl = document.getElementById("server-input")
        serverInputEl?.focus()
      }, 50)
    },
    isStringEmpty(str) {
      return !str.trim().length;
    }
  }
}
</script>

<style scoped>

</style>