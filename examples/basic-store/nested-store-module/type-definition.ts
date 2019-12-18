
import { StoreModuleDefinition } from "vuex-typescript-support";
import { RootStoreDefinition } from "../type-definition";

type NestedModuleState = {
  baz: string;
};

type NestedModuleGetters = {
  baz: string;
  bazPlusBar: string;
};

type NestedModuleMutations = {
  SET_BAZ: (newBaz: string) => void;
};

type NestedModuleActions = {
  setBazToBar: () => Promise<void>;
  setBazAndBar: (payload: { baz: string, bar: string }) => Promise<void>;
};

// Note: StoreModuleDefinition is very similar to StoreDefinition the only difference
// is that it requires the parameter Store to be set to the store that contains all modules,
// this will be typed check in order to verify whether all modules have the same Store defined as their root store.
export type NestedModuleDefinition = StoreModuleDefinition<{
  Store: RootStoreDefinition,
  State: NestedModuleState;
  Getters: NestedModuleGetters;
  Mutations: NestedModuleMutations;
  Actions: NestedModuleActions;
  Modules: {};
}>;
