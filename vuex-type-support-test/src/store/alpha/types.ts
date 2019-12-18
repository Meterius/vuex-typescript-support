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

export type AlphaMutations = {
  toggleVarA: () => void;
  addVarB: (x: number) => void;
}

export type AlphaActions = {
  toggleVarA: () => Promise<void>;
  add: (x: number) => Promise<void>;
}

export type AlphaStoreDefinition = StoreModuleDefinition<{
  Store: RootStoreDefinition;
  State: AlphaState;
  Getters: AlphaGetters;
  Mutations: AlphaMutations;
  Actions: AlphaActions;
  Modules: {};
}>;
