
import { StoreDefinition } from "vuex-typescript-support";
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

// Note: If undefined extends a certain payload type
// the commit and dispatch functions will make the payload parameter optional.
type RootStoreMutationPayloads = {
  RESET_FOO: undefined;
  INCREMENT_FOO: undefined;
  SET_BAR: string | undefined;
  APPEND_BAR: string;
};

// Note: All actions will be typed as returning Promise<void>
// since dispatch can only be called asynchronously and this makes
// it easier to use Actions and StoreActions to type safely
type RootStoreActionPayloads = {
  resetFooToOne: undefined;
  setBar: string;
  setBarAfterOneSec: string;
};

// Note: Theoretically every one of these types could be inlined in the StoreDefinition
// directly without any drawback, except visual clarity which is why it is not inlined in this
// example. This is possible since the specific types are also if necessary accessible via
// generic types like State, Getters, etc. and usually not used anyway since only
// the generic implementation types provide some advantage when explicitly used.
export type RootStoreDefinition = StoreDefinition<{
  State: RootStoreState;
  Getters: RootStoreGetters;
  MutationPayloads: RootStoreMutationPayloads;
  ActionPayloads: RootStoreActionPayloads;
  Modules: {
    nestedModule: NestedModuleDefinition;
  };
}>;
