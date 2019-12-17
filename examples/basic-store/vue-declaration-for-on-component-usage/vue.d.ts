import Vue from "vue";
import store from "../implementation";

declare module "vue/types/options" {
  interface ComponentOptions<V extends Vue> {
    // currently required since otherwise at the constructor
    // of vue a typescript error might occur
    store?: any;
  }
}

declare module "vue/types/vue" {
  interface Vue {
    // this will
    $store: typeof store;
  }
}
