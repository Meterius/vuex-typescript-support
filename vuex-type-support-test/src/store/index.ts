import "./vue";
import Vue from 'vue';
import Vuex, {Store} from 'vuex';
import {
  buildStoreOptions, buildTypedStore, CommitableMutations,
  StoreDefinition, TypedRootCommit,
  TypedRootGetters,
} from 'vuex-typescript-support';
import { alphaStore } from '@/store/alpha/implementation';
import { AlphaStoreDefinition } from '@/store/alpha/types';
import { betaStore } from '@/store/beta/implementation';
import { BetaStoreDefinition } from '@/store/beta/types';

Vue.use(Vuex);

export type RootStoreDefinition = StoreDefinition<{}, {}, {}, {}, {
  alpha: AlphaStoreDefinition,
  beta: BetaStoreDefinition,
}>;

const rootStoreImplementation = {
  state: {},
  getters: {},
  mutations: {},
  actions: {},
  modules: {
    alpha: alphaStore,
    beta: betaStore,
  },
};

export default buildTypedStore<RootStoreDefinition>(
  new Store(buildStoreOptions(rootStoreImplementation)),
  rootStoreImplementation,
);
