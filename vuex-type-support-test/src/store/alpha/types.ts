import {
  StoreModuleDefinition
} from "vuex-typescript-support";
import {RootStoreDefinition} from "@/store";

export type AlphaState = {
  varA: boolean;
  varB: number;
}

export type AlphaGetters = {
  getAndVarA: (operand: boolean, two: false) => boolean;
  varBPlusTwo: number;
}

export type AlphaMutationPayloads = {
  toggleVarA: undefined;
  addVarB: number;
}

export type AlphaActionPayloads = {
  toggleVarA: undefined;
  add: number;
}

export type AlphaStoreDefinition = StoreModuleDefinition<{
  Store: RootStoreDefinition;
  State: AlphaState;
  Getters: AlphaGetters;
  MutationPayloads: AlphaMutationPayloads;
  ActionPayloads: AlphaActionPayloads;
  Modules: {};
}>;
