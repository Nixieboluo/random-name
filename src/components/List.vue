<template>
  <div class="container mx-auto mt-8 mb-16 md:mb-8">
    <h1 class="text-gray-600 text-5xl font-light text-center">待点名单</h1>
    <div
      class="grid gap-4 mx-6 my-8 grid-cols-2 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 xl:grid-cols-8"
    >
      <div
        v-bind:class="{
          'item-active': item.active,
          'item-inactive': !item.active
        }"
        class="card shadow-md text-center pt-3 w-full h-12"
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
