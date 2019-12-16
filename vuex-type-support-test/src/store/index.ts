import "./vue";
import Vue from 'vue';
import Vuex, {Store} from 'vuex';
import {
  buildStoreOptions, createTypedStore, RootStoreDefinition, StaticTypeErrorCheck,
  StoreDefinition, TypedStore,
} from 'vuex-typescript-support';
import { alphaStore } from '@/store/alpha/implementation';
import { AlphaStoreDefinition } from '@/store/alpha/types';
import { betaStore } from '@/store/beta/implementation';
import { BetaStoreDefinition } from '@/store/beta/types';

Vue.use(Vuex);

export interface VuexStoreDefinition extends RootStoreDefinition<{}, {}, {}, {}, {
  alpha: AlphaStoreDefinition,
  beta: BetaStoreDefinition,
}> {}

const staticTypeCheck: StaticTypeErrorCheck<VuexStoreDefinition> = true;

const vuexStoreImplementation = {
  state: {},
  getters: {},
  mutations: {},
  actions: {},
  modules: {
    alpha: alphaStore,
    beta: betaStore,
  },
};

export default createTypedStore<VuexStoreDefinition, Store<any>>(
  Vuex.Store,
  vuexStoreImplementation
);
