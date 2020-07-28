<template>
  <div class="container mx-auto mt-8 mb-16 md:mb-8">
    <h1 class="text-5xl font-light text-center text-gray-600">点名结果</h1>
    <div class="flex flex-row flex-wrap mx-2 my-8">
      <div
        class="flex-auto w-1/3 h-24 pt-6 m-3 text-3xl text-center shadow-lg card item-selected sm:w-1/4 md:w-1/5 lg:w-1/6"
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
