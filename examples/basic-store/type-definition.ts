
import {StoreDefinition} from "vuex-typescript-support";
import {NestedModuleDefinition} from "./nested-store-module/type-definition";

type RootStoreState = {
  foo: number;
  bar: string;
};

type RootStoreGetters = {
  foo: number;
  trimmedBar: string;
  getBarWithSuffix: (suffix: string) => string;
};

// Note: that since () => unknown can be assigned to () => void
// mutations and actions could theoretically return anything, but since
// they are called via commit and dispatch, void and Promise<void> will always be
// returned respectively

type RootStoreMutations = {
  RESET_FOO: () => void;
  INCREMENT_FOO: () => void;
  SET_BAR: (newBar: string) => void;
};

// Note: While an action that is typed as returning Promise<void>
// forces the implementation to also return a Promise
// an action typed as return void can still be implemented with
// a function returning a promise (since () => Promise<void> can be assigned to () => void).
// This is not very relevant since actions can only be called via
// dispatch which will always return a promise.
type RootStoreActions = {
  resetFooToOne: () => Promise<void>;
  setBar: (newBar?: string) => Promise<void>;
  setBarAfterOneSec: (newBar: string) => Promise<void>;
};

// Note: Theoretically every one of these types could be inlined in the StoreDefinition
// directly without any drawback, except visual clarity which is why it is not inlined in this
// example. This is possible since the specific types are also if necessary accessible via
// generic types like State, Getters, etc. and usually not used anyway since only
// the generic implementation types provide some advantage when explicitly used.
export type RootStoreDefinition = StoreDefinition<{
  State: RootStoreState;
  Getters: RootStoreGetters;
  Mutations: RootStoreMutations;
  Actions: RootStoreActions;
  Modules: {
    nestedModule: NestedModuleDefinition;
  };
}>;
