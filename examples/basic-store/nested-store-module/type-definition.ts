
import { StoreModuleDefinition } from "vuex-typescript-support";
import { RootStoreDefinition } from "../type-definition";

type NestedModuleState = {
  baz: string;
};

type NestedModuleGetters = {
  baz: string;
  bazPlusBar: string;
};

type NestedModuleMutationPayloads = {
  SET_BAZ: string;
};

type NestedModuleActionPayloads = {
  setBazToBar: undefined;
  setBazAndBar: { baz: string, bar: string };
};

// Note: StoreModuleDefinition is very similar to StoreDefinition the only difference
// is that it requires the parameter Store to be set to the store that contains all modules,
// this will be typed check in order to verify whether all modules have the same Store defined as their root store.
export type NestedModuleDefinition = StoreModuleDefinition<{
  Store: RootStoreDefinition,
  State: NestedModuleState;
  Getters: NestedModuleGetters;
  MutationPayloads: NestedModuleMutationPayloads;
  ActionPayloads: NestedModuleActionPayloads;
  Modules: {};
}>;
