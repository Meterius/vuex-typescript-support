import { RootStoreDefinition } from "@/store";
import Vue from "vue";
import { TypedStore } from "vuex-typescript-support";

declare module "vue/types/options" {
  interface ComponentOptions<V extends Vue> {
    store?: any;
  }
}

declare module "vue/types/vue" {
  interface Vue {
    $store: TypedStore<RootStoreDefinition>;
  }
}
