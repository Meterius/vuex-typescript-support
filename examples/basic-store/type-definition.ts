
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

type RootStoreMutations = {
  RESET_FOO: () => void;
  INCREMENT_FOO: () => void;
  SET_BAR: (newBar: string) => void;
};

// Note: An action should always be typed with the return type Promise<void> and a mutation with void,
// any other return type will be overwritten be the Promise<void> and void respectively.
// Note: That the action implementations can return void or Promise<void>.
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
