import {TypedStore} from "vuex-typescript-support";
import {RootStoreDefinition} from "../type-definition";

declare module "vue/types/vue" {
  interface Vue {
    $store: TypedStore<RootStoreDefinition>;
  }
}
