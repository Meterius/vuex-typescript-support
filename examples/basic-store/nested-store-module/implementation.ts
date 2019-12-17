import {
  GettersImplementation,
  StateImplementation,
  State,
  MutationsImplementation,
  ActionsImplementation, ActionContext, StoreImplementation, StoreModuleImplementation
} from "vuex-typescript-support";
import { NestedModuleDefinition } from "./type-definition";

const nestedModuleState: StateImplementation<NestedModuleDefinition> = {
  baz: ":("
};

// Note: That the getters, rootState and rootGetters
// are properly typed, the only limitation being that currently modules
// cannot declare themselves to be namespaced, since typescript does not
// allow for key augmentation to enable this behaviour without runtime support
const nestedModuleGetters: GettersImplementation<NestedModuleDefinition> = {
  baz: state => state.baz,
  bazPlusBar: (state, getters, rootState) => getters.baz + rootState.bar
};

const nestedModuleMutations: MutationsImplementation<NestedModuleDefinition> = {
  SET_BAZ: (state: State<NestedModuleDefinition>, newBaz: string) => { state.baz = newBaz; },
};

const nestedModuleActions: ActionsImplementation<NestedModuleDefinition> = {
  setBazAndBar: ({ commit, rootGetters }: ActionContext<NestedModuleDefinition>) => {
    commit('SET_BAZ', rootGetters.getBarWithSuffix(""));
  },
};

// Note: That StoreModuleImplementation must be used instead of StoreImplementation
// for typing implementations of StoreModules.
// But also know that all these types are checked implicitly anyway at the creation of the store.
// They are only used here to make the logging of type errors easier to read since they will occur
// here instead of at the store creation if they are explicitly annotated.
export const nestedModuleImplementation: StoreModuleImplementation<NestedModuleDefinition> = {
  state: nestedModuleState,
  getters: nestedModuleGetters,
  mutations: nestedModuleMutations,
  actions: nestedModuleActions,
  modules: {},
};
