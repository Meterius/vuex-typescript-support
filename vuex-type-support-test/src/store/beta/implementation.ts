import {
  ActionsImplementation,
  GettersImplementation,
  MutationsImplementation,
  StateImplementation,
  StoreImplementation, StoreModuleImplementation,
} from 'vuex-typescript-support';
import { BetaStoreDefinition } from '@/store/beta/types';

export const stateImplementation: StateImplementation<BetaStoreDefinition> = {
  t: '',
};

export const gettersImplementation: GettersImplementation<BetaStoreDefinition> = {
  t: state => state.t,
  getT: state => () => state.t,
};

export const mutationsImplementation: MutationsImplementation<BetaStoreDefinition> = {
  changeT: (state, x: number) => { state.t = x.toString(); },
};

export const actionsImplementation: ActionsImplementation<BetaStoreDefinition> = {
  setT: ({ commit }, x: number) => { commit('changeT', x); },
};

export const betaStore: StoreModuleImplementation<BetaStoreDefinition> = {
  state: stateImplementation,
  getters: gettersImplementation,
  mutations: mutationsImplementation,
  actions: actionsImplementation,
  modules: {},
};
