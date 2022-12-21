<template>
  <main>
    <div class="container">
      <div class="bg-gray-700/60 h-[100%]">
        <div class="max-h-screen flex flex-nowrap flex-col overflow-y-auto">
          <nav class="bg-gray-700 sticky p-3 top-0 w-full z-20">
            <span class="text-lg font-medium text-gray-700 dark:text-white">General</span>
          </nav>

          <div class="ml-5 mt-5">
            <Chat message="Hello world!" author="brokiem"/>
            <Chat message="It's works!" author="brokiem"/>
            <Chat message="How are you?" author="brokiem"/>
            <Chat message="Hello!" author="brokiem"/>
            <Chat message="Hello!" author="brokiem"/>
            <Chat message="Hello!" author="brokiem"/>
            <Chat message="Hello!" author="brokiem"/>
            <Chat message="Hello!" author="brokiem"/>
            <Chat message="Hello!" author="brokiem"/>
            <Chat message="Hello!" author="brokiem"/>
            <Chat message="Hello!" author="brokiem"/>
            <Chat message="Hello!" author="brokiem"/>
            <Chat message="Hello!" author="brokiem"/>
            <Chat message="Hello!" author="brokiem"/>
            <Chat message="Hello!" author="brokiem"/>
            <Chat message="Hello!" author="brokiem"/>
            <Chat message="Hello!" author="brokiem"/>
            <Chat message="Hello!" author="brokiem"/>
            <Chat message="Hello!" author="brokiem"/>
            <Chat message="Hello!" author="brokiem"/>
            <Chat message="Hello! 3245" author="brokiem"/>
            <Chat message="Hello! 12" author="brokiem"/>
            <Chat message="Hello! 325342534" author="brokiem"/>
          </div>

          <div class="bottom-0 pb-6 ml-4 mr-4 sticky bg-[#2B313A] rounded-t-lg z-20">
            <input type="text" id="input-message" class="block p-3 text-sm text-gray-900 w-full outline-none rounded-lg bg-gray-50 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white" placeholder="Message" required>
          </div>
        </div>
      </div>
    </div>
  </main>
</template>

<script>
import Chat from "@/components/Chat.vue";

export default {
  name: "Chats",
  components: {Chat}
}
</script>

<style scoped>

</style>