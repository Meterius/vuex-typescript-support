import "./vue";
import Vue from 'vue';
import Vuex, {Store} from 'vuex';
import {
  createTypedStore,
  StoreDefinition, StoreImplementation, TypedStore,
} from 'vuex-typescript-support';
import { alphaStore } from '@/store/alpha/implementation';
import { AlphaStoreDefinition } from '@/store/alpha/types';
import { betaStore } from '@/store/beta/implementation';
import { BetaStoreDefinition } from '@/store/beta/types';

Vue.use(Vuex);

export type RootStoreDefinition = StoreDefinition<{
  State: {
    a: number
  };
  Getters: {};
  MutationPayloads: {};
  ActionPayloads: {};
  Modules: {
    alpha: AlphaStoreDefinition,
    beta: BetaStoreDefinition,
  };
}>;

const rootStoreImplementation: StoreImplementation<RootStoreDefinition> = {
  state: {
    a: 5
  },
  getters: {},
  mutations: {},
  actions: {},
  modules: {
    alpha: alphaStore,
    beta: betaStore,
  },
};

export default createTypedStore<RootStoreDefinition>(
  Vuex.Store, rootStoreImplementation
);
