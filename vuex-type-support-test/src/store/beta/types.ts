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

export type BetaMutationPayloads = {
  changeT: number;
}

export type BetaActionPayloads = {
  setT: number;
}

export type BetaStoreDefinition = StoreModuleDefinition<{
  Store: RootStoreDefinition;
  State: BetaState;
  Getters: BetaGetters;
  MutationPayloads: BetaMutationPayloads;
  ActionPayloads: BetaActionPayloads;
  Modules: {};
}>;
