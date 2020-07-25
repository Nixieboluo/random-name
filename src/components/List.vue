<template>
  <div class="container mx-auto items-center mt-8 my-12">
    <div
      class="grid gap-4 mx-6 my-8 grid-cols-2 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 xl:grid-cols-8"
    >
      <!-- 队列显示区域 -->
      <div
        v-bind:class="{
          'bg-red-200 text-red-600': item.active
        }"
        class="bg-gray-300 text-gray-600 shadow-md rounded-full text-center pt-3 w-full h-12"
        v-for="item in list"
        :key="item.name"
      >
        {{ item.name }} weights {{ item.weight }}
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "List",
  data: function() {
    return {
      list: []
    };
  },
  created() {
    fetch("conf.json")
      .then(response => response.json())
      .then(json => {
        this.list = json.list;
      });
  }
};
</script>
