import {
  Overwrite,
} from "./utility-types";
import {
  AnyStoreDefinition,
  AnyStoreModuleDefinition,
  Getters,
  Modules,
  State,
  StoreGetters,
  StoreState,
  Commit,
  Dispatch, MutationPayloads, ActionPayloads,
} from "./definition-types";
import { Store, StoreOptions } from "vuex";
import { TypedStore } from "./typed-store";

/*
    State Implementation
 */

export type StateImplementation<
  SD extends AnyStoreDefinition | AnyStoreModuleDefinition
> = (() => State<SD>) | State<SD>;

/*
    Getters Implementation
 */

export type GettersImplementation<
  SD extends AnyStoreDefinition | AnyStoreModuleDefinition
> = {
  [key in keyof Getters<SD>]: (
    state: State<SD>, getters: Getters<SD>, rootState: StoreState<SD>, rootGetters: StoreGetters<SD>
  ) => Getters<SD>[key]
}

/*
    Mutations Implementation
 */

export type MutationsImplementation<
  SD extends AnyStoreDefinition | AnyStoreModuleDefinition
> = {
  [key in keyof MutationPayloads<SD>]: undefined extends MutationPayloads<SD>[key] ?
    (state: State<SD>, payload?: MutationPayloads<SD>[key]) => void :
    (state: State<SD>, payload: MutationPayloads<SD>[key]) => void
}

/*
    Actions Implementation
 */

export type ActionContext<
  SD extends AnyStoreDefinition | AnyStoreModuleDefinition
  > = {
  dispatch: Dispatch<SD>;
  commit: Commit<SD>;
  state: State<SD>;
  rootState: StoreState<SD>;
  getters: Getters<SD>;
  rootGetters: StoreGetters<SD>;
}

export type ActionsImplementation<
  SD extends AnyStoreDefinition | AnyStoreModuleDefinition
  > = {
  [key in keyof ActionPayloads<SD>]: undefined extends ActionPayloads<SD>[key]?
    (context: ActionContext<SD>, payload?: ActionPayloads<SD>[key]) => Promise<void> | void :
    (context: ActionContext<SD>, payload: ActionPayloads<SD>[key]) => Promise<void> | void
}

/*
    Modules Implementation
 */

export type ModulesImplementation<SD extends AnyStoreDefinition | AnyStoreModuleDefinition> = {
  [key in keyof Modules<SD>]: StoreModuleImplementation<Modules<SD>[key]>
}

export type StoreModuleImplementation<SD extends AnyStoreModuleDefinition> = {
  state: StateImplementation<SD>;
  getters: GettersImplementation<SD>;
  mutations: MutationsImplementation<SD>;
  actions: ActionsImplementation<SD>;
  modules: ModulesImplementation<SD>;

  namespaced?: false; // currently disabled
};

/*
    Store Implementation
 */

export type StoreImplementation<SD extends AnyStoreDefinition> =
  Overwrite<StoreOptions<Store<any>>, {
  state: StateImplementation<SD>;
  getters: GettersImplementation<SD>;
  mutations: MutationsImplementation<SD>;
  actions: ActionsImplementation<SD>;
  modules: ModulesImplementation<SD>;

  plugins?: ((store: TypedStore<SD>) => void)[];
}>;
