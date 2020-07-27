<template>
  <div class="mb-4" id="app">
    <div
      class="bg-teal-200 text-teal-600 card text-center shadow-lg pt-12 w-64 h-32 mx-auto mt-4"
    >
      Logo Placeholder
    </div>
    <List :list="list"></List>
    <input
      type="button"
      value="Pick One"
      class="btn btn-primary bottom-fixed md:rounded-lg md:relative md:w-1/2 md:m-auto"
      v-on:click="random"
    />
  </div>
</template>

<script>
import List from "./components/List.vue";

export default {
  name: "App",
  data: function() {
    return {
      list: [],
      selectCount: 1
    };
  },
  created() {
    // Read config file.
    // TODO: Allow uploading local configurations.
    // TODO: Allow reading from URLs.
    fetch("conf.json")
      .then(response => response.json())
      .then(json => {
        this.list = json.list;
        this.selectCount = json.selectCount;
      });
  },
  methods: {
    // An implement of Weighted Random Sampling (A-Res).
    random: function() {
      // Initialize the heap and item weights.
      const heap = [...this.listActive].slice(0, this.selectCount);
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
        for (let i = this.selectCount; i < this.listActive.length; i++) {
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
    List
  }
};
</script>
