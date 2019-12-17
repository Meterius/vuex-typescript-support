import {
  GettersImplementation,
  StateImplementation,
  State,
  MutationsImplementation,
  ActionsImplementation,
  ActionContext,
  StoreImplementation,
  TypedStore, createTypedStore,
} from "vuex-typescript-support";
import Vuex from "vuex";
import { RootStoreDefinition } from "./type-definition";
import {nestedModuleImplementation} from "./nested-store-module/implementation";

const rootStoreState: StateImplementation<RootStoreDefinition> = {
  foo: 5,
  bar: "hello",
};

// Note: the explicit parameter types can be omitted, since
// the implementation types already ensure that they are
// typed correctly

const rootStoreGetters: GettersImplementation<RootStoreDefinition> = {
  foo: (state: State<RootStoreDefinition>) => state.foo,
  trimmedBar: (state: State<RootStoreDefinition>) => state.bar.trim(),
  getBarWithSuffix: (state: State<RootStoreDefinition>) => (suffix: string) => state.bar + suffix,
};

const rootStoreMutations: MutationsImplementation<RootStoreDefinition> = {
  INCREMENT_FOO: (state: State<RootStoreDefinition>) => { state.foo += 1; },
  RESET_FOO: (state: State<RootStoreDefinition>) => { state.foo = 0; },
  SET_BAR: (state: State<RootStoreDefinition>, newBar: string) => { state.bar = newBar; },
};

const rootStoreActions: ActionsImplementation<RootStoreDefinition> = {
  resetFooToOne: ({ commit }: ActionContext<RootStoreDefinition>) => {
    // Note: Mutations without payload can be called on commit without the payload specified,
    // or the payload set to undefined (in case commit options are required to be specified)
    commit('RESET_FOO');
    commit('INCREMENT_FOO', undefined);
  },
  setBar: ({ commit }: ActionContext<RootStoreDefinition>, newBar: string) => {
    // Note: In commit as well as dispatch only names that are actually defined are possible
    // as values and their payloads are properly typed as well, i.e. in this
    // example commit('SET_BAR', payload) requires payload to be of
    // type string and will give a static typescript error if it is not.
    commit('SET_BAR', newBar);
  },
  setBarAfterOneSec: async ({ dispatch }: ActionContext<any>, newBar: string): Promise<void> => {
    // wait one second (not implemented in this example)

    // Note: Dispatch is always asynchronous even if the action is implement synchronously
    await dispatch("setBar", newBar);
  },
};

const rootStoreImplementation: StoreImplementation<RootStoreDefinition> = {
  state: rootStoreState,
  getters: rootStoreGetters,
  mutations: rootStoreMutations,
  actions: rootStoreActions,
  modules: {
    nestedModule: nestedModuleImplementation,
  },
};

// Note: The constructor of the used Vuex Store is required since
// an error will be thrown if it is used directly in the library.
// Note: The TypedStore is a generic type that will automatically
// infer the store definition type if the implementation parameter
// is typed in createTypedStore.
// But to ensure no unforeseen errors occur, it is safer to explicitly
// say which type of store is used.
// (The created store is currently technically identical to the one created with
// new Vuex.Store(rootStoreImplementation) but ensures its type)
export default createTypedStore<RootStoreDefinition>(
  Vuex.Store, rootStoreImplementation,
);
