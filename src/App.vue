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
      list: []
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
      });
  },
  methods: {
    random: function() {
      console.log(this.list);
    }
  },
  computed: {
    // Select active items and put their subscripts into an array.
    listActive: function() {
      const active = [];
      for (let i = 0; i < this.list.length; i++) {
        if (this.list[i].active == true) {
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
