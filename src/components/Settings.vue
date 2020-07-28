<template>
  <modal
    classes="rounded-lg shadow-4xl"
    v-bind:adaptive="modalAdaptive"
    height="260"
    @before-open="init"
    name="Settings"
  >
    <div class="container mx-auto mt-1 mb-4">
      <h1 class=" text-gray-600 text-4xl font-light text-center">
        设置
      </h1>
      <form class="px-4">
        <div class="w-full mx-auto">
          <div class="mb-2">
            <label class="label" for="configUrl">
              配置地址
            </label>
            <input
              class="input-text rounded-r-none w-2/3"
              type="url"
              id="configUrl"
              v-model="inputConfigUrl"
            />
            <input
              class="btn btn-form"
              type="button"
              value="应用配置"
              v-on:click="applyConfigUrl"
            />
          </div>
        </div>
        <div class="w-full mx-auto">
          <div class="mb-2">
            <label class="label" for="selectCount">
              抽取数量
            </label>
            <input
              class="input-text"
              type="number"
              min="1"
              v-bind:max="listLength"
              v-model.number="inputConfig.selectCount"
              id="selectCount"
            />
          </div>
        </div>
        <div class="w-full mx-auto">
          <input
            class="btn font-normal text-gray-600 hover:text-gray-800 bg-white hover:bg-gray-200 border-t rounded-t-none shadow-none absolute bottom-0 left-0 w-full"
            type="button"
            value="确定"
            v-on:click="close"
          />
        </div>
      </form>
    </div>
  </modal>
</template>

<script>
export default {
  name: "Settings",
  data: function() {
    return {
      modalAdaptive: true,
      inputConfig: {},
      inputConfigUrl: "default.json"
    };
  },
  methods: {
    init: function() {
      this.inputConfigUrl = this.configUrl;
      this.inputConfig = { ...this.config };
    },
    close: function() {
      // Apply config file (only list) and custom config.
      this.$emit("applyConfig", this.inputConfigUrl, this.inputConfig);
      this.$modal.hide("Settings");
    },
    applyConfigUrl: function() {
      // Apply entire config file.
      this.$emit("applyConfigUrl", this.inputConfigUrl);
      this.$modal.hide("Settings");
    }
  },
  props: {
    configUrl: String,
    config: [Array, Object],
    listLength: Number
  }
};
</script>
