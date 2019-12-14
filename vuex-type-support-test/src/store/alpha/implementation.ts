import {
  ActionsImplementation,
  GettersImplementation,
  MutationsImplementation,
  StateImplementation,
  StoreImplementation
} from "vuex-typescript-support";
import { AlphaStoreDefinition } from "@/store/alpha/types";

export const stateImplementation: StateImplementation<AlphaStoreDefinition> = {
  varA: false,
  varB: 0,
};

export const gettersImplementation: GettersImplementation<AlphaStoreDefinition> = {
  varBPlusTwo: state => state.varB + 2,
  getAndVarA: (state) => (operand: boolean) => state.varA && operand,
};

export const mutationsImplementation: MutationsImplementation<AlphaStoreDefinition> = {
  toggleVarA: (state) => { state.varA = !state.varA; },
  addVarB: (state, x) => { state.varB += x; },
};

export const actionsImplementation: ActionsImplementation<AlphaStoreDefinition> = {
  toggleVarA: ({ commit }) => { commit('toggleVarA'); },
  add: ({ commit }, x) => { commit('addVarB', x); }
};

export const alphaStore: StoreImplementation<AlphaStoreDefinition> = {
  state: stateImplementation,
  getters: gettersImplementation,
  mutations: mutationsImplementation,
  actions: actionsImplementation,
};

