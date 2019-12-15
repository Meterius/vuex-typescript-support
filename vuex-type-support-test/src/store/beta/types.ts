import { StoreDefinition, TypedRootGetters } from 'vuex-typescript-support';

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
  BetaState, BetaGetters, BetaMutations, BetaActions, {}, 'true'
>;
