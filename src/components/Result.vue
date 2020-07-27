<template>
  <div class="container mx-auto mt-8 mb-16 md:mb-8">
    <h1 class="text-gray-600 text-5xl font-light text-center">点名结果</h1>
    <div class="flex flex-row flex-wrap mx-2 my-8">
      <div
        class="card item-selected shadow-lg text-center text-3xl pt-6 flex-auto m-3 h-24 w-1/3 sm:w-1/4 md:w-1/5 lg:w-1/6"
        v-for="item in result"
        :key="item"
      >
        {{ item }}
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Result",
  props: ["result"]
};
</script>
