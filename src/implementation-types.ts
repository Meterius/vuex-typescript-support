import {HasPayload, Payload, UnionToIntersection} from "./utility-types";
import {
  Actions,
  AnyStoreDefinition,
  AnyStoreModuleDefinition, Getters, Modules, Mutations, RootStore, State
} from "./definition-types";

type _StoreState<SD extends AnyStoreDefinition | AnyStoreModuleDefinition> = UnionToIntersection<{
  readonly [key in keyof Modules<SD>]: _StoreState<Modules<SD>[key]>
}[keyof Modules<SD>]> & State<SD>

export type StoreState<SD extends AnyStoreDefinition> = _StoreState<SD>;

type _StoreGetters<SD extends AnyStoreDefinition | AnyStoreModuleDefinition> = UnionToIntersection<{
  readonly [key in keyof Modules<SD>]: _StoreGetters<Modules<SD>[key]>
}[keyof Modules<SD>]> & Getters<SD>;

export type StoreGetters<SD extends AnyStoreDefinition> = _StoreGetters<SD>;

export type _StoreCommit<SD extends AnyStoreDefinition | AnyStoreModuleDefinition> = UnionToIntersection<{
  readonly [key in keyof Modules<SD>]: _StoreCommit<Modules<SD>[key]>
}[keyof Modules<SD>]> & Commit<SD>;

export type StoreCommit<SD extends AnyStoreDefinition> = _StoreCommit<SD>;

export type _StoreDispatch<SD extends AnyStoreDefinition | AnyStoreModuleDefinition> = UnionToIntersection<{
  readonly [key in keyof Modules<SD>]: _StoreDispatch<Modules<SD>[key]>
}[keyof Modules<SD>]> & Dispatch<SD>;

export type StoreDispatch<SD extends AnyStoreDefinition> = _StoreDispatch<SD>;

export type Commit<
  SD extends AnyStoreDefinition | AnyStoreModuleDefinition
  > = {
  <MutationName extends keyof Mutations<SD>>(
    mutation: MutationName, payload: Payload<Mutations<SD>[MutationName]>
  ): void;

  <MutationName extends MutationKeysWithoutPayload<SD>>(
    mutation: MutationName
  ): void;
};

export type Dispatch<
  SD extends AnyStoreDefinition | AnyStoreModuleDefinition
  > = {
  <ActionName extends keyof Actions<SD>>(
    action: ActionName, payload: Payload<Actions<SD>[ActionName]>
  ): Promise<void>;

  <ActionName extends ActionKeysWithoutPayload<SD>>(
    action: ActionName
  ): Promise<void>;
};

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
  [key in keyof Getters<SD>]: (state: State<SD>) => Getters<SD>[key]
}

/*
    Mutations Implementation
 */

export type MutationKeysWithoutPayload<
  SD extends AnyStoreDefinition | AnyStoreModuleDefinition
  > = {
  [key in keyof Mutations<SD>]: HasPayload<Mutations<SD>[key]> extends true ?
    never : key;
}[keyof Mutations<SD>];

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

export type ActionKeysWithoutPayload<
  SD extends AnyStoreDefinition | AnyStoreModuleDefinition
> = {
  [key in keyof Actions<SD>]: HasPayload<Actions<SD>[key]> extends true ?
    never : key;
}[keyof Actions<SD>];

export type ActionContext<
  SD extends AnyStoreDefinition | AnyStoreModuleDefinition
  > = {
  dispatch: Dispatch<SD>;
  commit: Commit<SD>;
  state: State<SD>;
  getters: Getters<SD>;
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
