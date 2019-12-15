import { TypedStore } from "vuex-typescript-support";
import { RootStoreDefinition } from "@/store/index";
import Vue from "vue";

declare module "vue/types/options" {
  interface ComponentOptions<V extends Vue> {
    store?: TypedStore<RootStoreDefinition>;
  }
}

declare module "vue/types/vue" {
  interface Vue {
    $store: TypedStore<RootStoreDefinition>;
  }
}
