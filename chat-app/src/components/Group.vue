<template>
  <li @click="selectGroup" class="select-none bg-blue-600 rounded-lg w-12 h-12 flex justify-center items-center hover:bg-blue-500 transition duration-200 cursor-pointer">
    {{title.slice(0, 2).toUpperCase() ?? "un"}}
  </li>
</template>

<script>
export default {
  name: "Group",
  props: {
    id: {
      type: String,
      required: true
    },
    title: {
      type: String,
      required: true
    }
  },
  methods: {
    selectGroup: function () {
      localStorage.setItem("selectedGroup", JSON.stringify({
        id: this.id,
        title: this.title
      }))
      window.dispatchEvent(new StorageEvent("storage", {
        key: "selectedGroup",
        newValue: JSON.stringify({
          id: this.id,
          title: this.title
        })
      }))
    }
  }
}
</script>

<style scoped>

</style>