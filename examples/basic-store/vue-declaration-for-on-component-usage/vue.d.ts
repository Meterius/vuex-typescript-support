import Vue from "vue";
import store from "../implementation";

declare module "vue/types/options" {
  interface ComponentOptions<V extends Vue> {
    // currently required since otherwise at the constructor
    // the depth of recursion in the type definitions will exceed
    // the currently hard coded limit in typescript
    store?: any;
  }
}

declare module "vue/types/vue" {
  interface Vue {
    $store: typeof store;
  }
}
