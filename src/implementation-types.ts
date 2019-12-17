import {HasPayload, KeysWithoutPayload, Payload, UnionToIntersection} from "./utility-types";
import {
  Actions,
  AnyStoreDefinition,
  AnyStoreModuleDefinition,
  Getters,
  Modules,
  Mutations,
  State,
  StoreGetters,
  StoreState,
  Commit,
  Dispatch
} from "./definition-types";

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
  [key in keyof Mutations<SD>]: HasPayload<Mutations<SD>[key]> extends true ?
    (state: State<SD>, payload: Payload<Mutations<SD>[key]>) => void :
    (state: State<SD>) => void
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
  [key in keyof Actions<SD>]: HasPayload<Actions<SD>[key]> extends true ?
    (context: ActionContext<SD>, payload: Payload<Actions<SD>[key]>) => ReturnType<Actions<SD>[key]> :
    (context: ActionContext<SD>) => ReturnType<Actions<SD>[key]>
}

/*
    Modules Implementation
 */

export type ModulesImplementation<SD extends AnyStoreDefinition | AnyStoreModuleDefinition> = {
  [key in keyof Modules<SD>]: StoreModuleImplementation<Modules<SD>[key]>
}

export interface StoreModuleImplementation<SD extends AnyStoreModuleDefinition> {
  state: StateImplementation<SD>;
  getters: GettersImplementation<SD>;
  mutations: MutationsImplementation<SD>;
  actions: ActionsImplementation<SD>;
  modules: ModulesImplementation<SD>;
}

/*
    Store Implementation
 */

export interface StoreImplementation<SD extends AnyStoreDefinition> {
  state: StateImplementation<SD>;
  getters: GettersImplementation<SD>;
  mutations: MutationsImplementation<SD>;
  actions: ActionsImplementation<SD>;
  modules: ModulesImplementation<SD>;
}
