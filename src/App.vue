<template>
  <div class="mx-auto mb-4" id="app">
    <!-- Settings entry -->
    <svg
      fill="none"
      stroke-linecap="round"
      stroke-linejoin="round"
      stroke-width="2"
      viewBox="0 0 24 24"
      stroke="currentColor"
      class="absolute top-0 right-0 w-8 h-8 m-4 text-gray-400 transition duration-200 ease-in-out hover:text-gray-500"
      v-on:click="openSettings"
    >
      <path
        d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
      ></path>
      <path d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path>
    </svg>

    <Settings
      :configUrl="configUrl"
      :config="config"
      :listLength="this.list.length"
      @applyConfigUrl="init"
      @applyConfig="applyConfig"
    ></Settings>

    <!-- The two pages -->
    <transition name="fade">
      <List :list="list" v-if="currentPage == 'List'"></List>
      <Result :result="listSelected" v-if="currentPage == 'Result'"></Result>
    </transition>

    <!-- Buttons on pages -->
    <input
      v-if="currentPage == 'List'"
      type="button"
      value="随机抽取"
      class="btn btn-primary bottom-fixed md:rounded-lg md:relative md:w-1/2 md:m-auto"
      v-on:click="random(), (currentPage = 'Result')"
    />
    <input
      v-if="currentPage == 'Result'"
      type="button"
      value="返回列表"
      class="btn btn-primary bottom-fixed md:rounded-lg md:relative md:w-1/2 md:m-auto"
      v-on:click="currentPage = 'List'"
    />
  </div>
</template>

<style>
/* Transitions between pages */
.fade-enter-active {
  transition: opacity 0.5s;
}
.fade-leave-active {
  transition: opacity 0.5s;
  display: none;
}
.fade-enter {
  opacity: 0;
}
.fade-leave-to {
  opacity: 0;
  display: none;
}
</style>

<script>
import List from "./components/List.vue";
import Result from "./components/Result.vue";
import Settings from "./components/Settings.vue";

export default {
  name: "App",
  data: function() {
    return {
      configUrl: "default.json",
      list: [],
      config: {},
      listSelected: [],
      currentPage: "List"
    };
  },
  created() {
    this.init(this.configUrl);
  },
  methods: {
    init: function(url) {
      this.configUrl = url;
      // Read config file.
      fetch(url)
        .then(response => response.json())
        .then(json => {
          this.list = json.list;
          this.config = json.config;
        });
    },
    applyConfig: function(url, config) {
      this.configUrl = url;
      // Read config file (only list).
      fetch(url)
        .then(response => response.json())
        .then(json => {
          this.list = json.list;
        });
      // Apply custom config
      this.config = config;
    },
    // An implement of Weighted Random Sampling (A-Res).
    random: function() {
      // Initialize the heap and item weights.
      const heap = [...this.listActive].slice(0, this.config.selectCount);
      const heapWeight = [];

      // For every element in heap, calculate a key value (calculated weight).
      heap.forEach(item => {
        // ki = ui ^ (1 / wi)
        // ki: the key value (calculated weight) of the element i in heap.
        // ui: the weight of the element i in heap.
        // wi: A random value (random(0, 1)).
        heapWeight.push(Math.pow(Math.random(), 1 / this.list[item].weight));
      });

      if (heap.length < this.listActive.length) {
        // Now we can calculate other key values.
        for (let i = this.config.selectCount; i < this.listActive.length; i++) {
          // index: Index of current active item.
          const index = this.listActive[i];
          // minWeight: Minimal value in heap.
          const minWeight = Math.min(...heapWeight);
          // indexOfMin: Index of the mimimal element in heapWeight.
          const indexOfMin = (heapWeight || []).findIndex(
            item => item === minWeight
          );
          // currentWeight: Key value of current active item.
          const currentWeight = Math.pow(
            Math.random(),
            1 / this.list[index].weight
          );

          // For every  element, if ki > T, replace the minimal value in R with vi.
          // T: The minimal value in heap.
          // R: The heap (Both heap (the item indexes) and heapWeight (weight of items)).
          // ki: Key value of current active item.
          // vi: Current item
          if (currentWeight.valueOf() > minWeight.valueOf()) {
            heap[indexOfMin] = index;
            heapWeight[indexOfMin] = currentWeight;
          }
        }
      }
      // Show result.
      this.showResult(heap);
    },

    // Chear and fill the results array.
    showResult: function(result) {
      this.listSelected = [];
      result.forEach(item => {
        this.listSelected.push(this.list[item].name);
      });
    },

    // Open the Settigns modal.
    openSettings: function() {
      this.$modal.show("Settings");
    }
  },
  computed: {
    // Select active items and put their indexes into an array.
    listActive: function() {
      const active = [];
      for (let i = 0; i < this.list.length; i++) {
        const isActive = this.list[i].active;
        if (isActive == true) {
          active.push(i);
        }
      }
      return active;
    }
  },
  components: {
    List,
    Result,
    Settings
  }
};
</script>
