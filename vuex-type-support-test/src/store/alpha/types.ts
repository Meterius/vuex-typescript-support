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
  toggleVarA: () => void;
  add: (x: number) => void;
}

export type AlphaStoreDefinition = StoreModuleDefinition<
  RootStoreDefinition, AlphaState, AlphaGetters, AlphaMutations, AlphaActions, {}
>;
