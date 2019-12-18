import store from "../implementation";

declare module "vue/types/vue" {
  interface Vue {
    $store: typeof store;
  }
}
