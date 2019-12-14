import { CheckedStoreDefinition, State, StoreImplementation } from "./types";
import { StoreOptions } from "vuex";

export function buildStore<
  SD extends CheckedStoreDefinition, SI extends StoreImplementation<SD>
>(store: SI): StoreOptions<State<SD>> {
  return {
    state: store["state"] || {},
    getters: store["getters"] || {},
    mutations: store["mutations"] || {},
    actions: store["actions"] || {},
    modules: store["modules"] || {},
  }
}
