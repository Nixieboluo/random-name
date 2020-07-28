<template>
  <div class="container mx-auto mt-8 mb-16 md:mb-8">
    <h1 class="text-5xl font-light text-center text-gray-600">待点名单</h1>
    <div
      class="grid grid-cols-2 gap-4 mx-6 my-8 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 xl:grid-cols-8"
    >
      <div
        v-bind:class="{
          'item-active': item.active,
          'item-inactive': !item.active
        }"
        class="w-full h-12 pt-3 text-center shadow-md card"
        v-on:click="item.active = !item.active"
        v-for="item in list"
        :key="item.name"
      >
        {{ item.name }}
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "List",
  props: ["list"]
};
</script>
