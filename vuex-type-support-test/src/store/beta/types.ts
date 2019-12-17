import {
  StoreModuleDefinition,
} from 'vuex-typescript-support';
import {RootStoreDefinition} from "@/store";

export interface BetaState {
  t: string;
}

export interface BetaGetters {
  getT: () => string;
  t: string;
}

export type BetaMutations = {
  changeT: (x: number) => void;
}

export type BetaActions = {
  setT: (x: number) => void;
}

export type BetaStoreDefinition = StoreModuleDefinition<{
  Store: RootStoreDefinition;
  State: BetaState;
  Getters: BetaGetters;
  Mutations: BetaMutations;
  Actions: BetaActions;
  Modules: {};
}>;
