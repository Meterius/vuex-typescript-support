import {StaticTypeErrorCheck, StoreDefinition} from 'vuex-typescript-support';
import { VuexStoreDefinition } from "@/store";
import {BetaStoreDefinition} from "@/store/beta/types";

export interface AlphaState {
  varA: boolean;
  varB: number;
}

export interface AlphaGetters {
  getAndVarA: (operand: boolean, two: false) => boolean;
  varBPlusTwo: number;
}

export interface AlphaMutations {
  toggleVarA(): void;
  addVarB(x: number): void;
}

export interface AlphaActions {
  toggleVarA(): void;
  add(x: number): void;
}

export type AlphaStoreDefinition = StoreDefinition<
  VuexStoreDefinition, AlphaState, AlphaGetters, AlphaMutations, AlphaActions
>;

const staticTypeCheck: StaticTypeErrorCheck<AlphaStoreDefinition> = true;
