import Vue from "vue";
import VModal from "vue-js-modal";
import App from "./App.vue";
import "./assets/css/tailwind.css";

Vue.config.productionTip = false;

Vue.use(VModal, {
  dialog: true,
  dynamic: true
});

new Vue({
  render: h => h(App)
}).$mount("#app");
