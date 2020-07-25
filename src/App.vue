<template>
  <div id="app">
    <div
      class="bg-teal-200 text-teal-600 text-lg text-center pt-12 w-64 h-32 mx-auto my-12"
    >
      Logo Placeholder
    </div>
    <List></List>
    <input
      type="button"
      value="Pick One"
      class="bg-blue-500 hover:bg-blue-700 focus:outline-none focus:shadow-outline text-white font-bold block text-center rounded-none md:rounded fixed md:relative bottom-0 w-full md:w-1/2 md:m-auto h-12"
    />
  </div>
</template>

<script>
import List from "./components/List.vue";

export default {
  name: "App",
  components: {
    List
  }
};
</script>
