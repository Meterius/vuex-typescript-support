import {
  StaticTypeErrorCheck,
  StoreCommit,
  StoreDefinition,
} from 'vuex-typescript-support';
import {VuexStoreDefinition} from "@/store";

export interface BetaState {
  t: string;
}

export interface BetaGetters {
  getT: () => string;
  t: string;
}

export interface BetaMutations {
  changeT: (x: number) => void;
}

export interface BetaActions {
  setT: (x: number) => void;
}

export type BetaStoreDefinition = StoreDefinition<
  VuexStoreDefinition, BetaState, BetaGetters, BetaMutations, BetaActions
>;

const staticTypeCheck: StaticTypeErrorCheck<BetaStoreDefinition> = true;
