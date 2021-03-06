/*
 * Store Definition Types
 */

import {Store} from "vuex";

type NotExtendingKeys<T extends {}, E> = {
  [key in keyof T]: T[key] extends E ? never : key
}[keyof T];

type ValueTypes<T extends {}> = keyof T extends never ? never : T[keyof T];

type ModulesRootTypes<T extends {}> = {
  [key in keyof T]: T[key] extends CheckedStoreDefinition ?
    ModulesRootTypes<Modules<T[key]>> | RootStore<T[key]> : null
}[keyof T];

type NotExtendingRootModules<T extends {}, E> = {
  [key in keyof T]: T[key] extends CheckedStoreDefinition ?
    NotExtendingRootModules<Modules<T[key]>, E> | (
      RootStore<T[key]> extends E ? never : key
    ) : never
}[keyof T];

type AnyFunction = (...args: any) => any;

type AnyFunctionWithNotMoreThanOneParameter = (primary?: any) => any;

type TestValues<T extends {}, E, ERR extends string, R> =
  ValueTypes<T> extends E ? R : StaticTypeError<ERR, NotExtendingKeys<T, E>>;

type TestModulesRoots<M extends {}, E, ERR extends string, R> =
  ModulesRootTypes<M> extends E ? R : StaticTypeError<ERR, NotExtendingRootModules<M, E>>;

type BaseStoreDefinition<
  RootStore extends CheckedStoreDefinition | null,
  State extends {},
  Getters extends {},
  Mutations extends {},
  Actions extends {},
  Modules extends {} = {}
  // Namespaced extends "true" | "false" = "false",
  > = TestValues<Mutations, AnyFunction, "Static Type Error: Some Mutations Are Not Functions",
  TestValues<Mutations, AnyFunctionWithNotMoreThanOneParameter, "Static Type Error: Some Mutations Have More Than One Parameter",
  TestValues<Actions, AnyFunction, "Static Type Error: Some Actions Are Not Functions",
  TestValues<Actions, AnyFunctionWithNotMoreThanOneParameter, "Static Type Error: Some Actions Have More Than One Parameter",
  TestValues<Modules, CheckedStoreDefinition, "Static Type Error: Some Modules Are Not Valid Store Definitions",
//  TestModulesRoots<Modules, RootStore, "Static Type Error: Some Modules Have Not The Same Root Store",
    CheckedStoreDefinition<RootStore, State, Getters, Mutations, Actions, Modules>
//  >
    >>>>>;

export type RootStoreDefinition<
  State extends {},
  Getters extends {},
  Mutations extends {},
  Actions extends {},
  Modules extends {} = {},
> = BaseStoreDefinition<null, State, Getters, Mutations, Actions, Modules>;

export type StoreDefinition<
  RootStore extends CheckedStoreDefinition,
  State extends {},
  Getters extends {},
  Mutations extends {},
  Actions extends {},
  Modules extends {} = {},
  // Namespaced extends "true" | "false" = "false",
> = BaseStoreDefinition<RootStore, State, Getters, Mutations, Actions, Modules>;

export type StaticTypeErrorCheck<V> = V extends StaticTypeError<infer M, infer K> ? StaticTypeError<M, K> : true;

export type CheckedRootStoreDefinition<
  State = any,
  Getters = any,
  Mutations = any,
  Actions = any,
  Modules = any,
> = CheckedStoreDefinition<null, State, Getters, Mutations, Actions, Modules>;

export type CheckedStoreDefinition<
  RootStore extends CheckedStoreDefinition | null = any,
  State = any,
  Getters = any,
  Mutations = any,
  Actions = any,
  Modules = any,
  // Namespaced = any,
  > = {
  error: never;
  keys: never;

  RootStore: RootStore;
  State: State;
  Getters: Readonly<Getters>;
  Mutations: Readonly<Mutations>;
  Actions: Readonly<Actions>;
  Modules: Readonly<Modules>;
  // Namespaced: Namespaced extends "true" ? true : false;
};

type StaticTypeError<MSG, KEYS = undefined> = {
  StaticTypeError: true,
  Message: MSG,
  Keys: KEYS,
}

/*
 * Checked Store Definition Types
 */

export type IsRootStore<SD extends CheckedStoreDefinition> = RootStore<SD> extends null ? true : false;

export type RootStore<SD extends CheckedStoreDefinition> = SD['RootStore'];

export type State<SD extends CheckedStoreDefinition> = SD['State'];

export type Getters<SD extends CheckedStoreDefinition> = SD['Getters'];

type UnionToIntersection<U> =
  (U extends any ? (k: U)=>void : never) extends ((k: infer I)=>void) ? I : never;

export type StoreGetters<SD extends CheckedStoreDefinition> = UnionToIntersection<{
  readonly [key in keyof Modules<SD>]: StoreGetters<Modules<SD>[key]>
}[keyof Modules<SD>]> & Getters<SD>;

/*export type TypedRootGetters<SD extends CheckedStoreDefinition> = UnionToIntersection<{
  readonly [key in keyof Modules<SD>]: Namespaced<Modules<SD>[key]> extends true ? {
    readonly [k in key]: TypedRootGetters<Modules<SD>[key]>
  } : TypedRootGetters<Modules<SD>[key]>
}[keyof Modules<SD>]> & Getters<SD>;*/

export type Mutations<SD extends CheckedStoreDefinition> = SD['Mutations'];

type MutationKeysWithPayload<SD extends CheckedStoreDefinition> = {
  [key in keyof Mutations<SD>]: IsMutationPayloadDefined<Mutations<SD>[key]> extends true ?
    key : never;
}[keyof Mutations<SD>]

type MutationKeysWithoutPayload<SD extends CheckedStoreDefinition> = {
  [key in keyof Mutations<SD>]: IsMutationPayloadDefined<Mutations<SD>[key]> extends true ?
    never : key;
}[keyof Mutations<SD>];

export type Actions<SD extends CheckedStoreDefinition> = SD['Actions'];

type ActionKeysWithPayload<SD extends CheckedStoreDefinition> = {
  [key in keyof Actions<SD>]: IsActionPayloadDefined<Actions<SD>[key]> extends true ?
    key : never;
}[keyof Actions<SD>]

type ActionKeysWithoutPayload<SD extends CheckedStoreDefinition> = {
  [key in keyof Actions<SD>]: IsActionPayloadDefined<Actions<SD>[key]> extends true ?
    never : key;
}[keyof Actions<SD>];

export type Modules<SD extends CheckedStoreDefinition> = SD['Modules'];

// export type Namespaced<SD extends CheckedStoreDefinition> = SD['Namespaced'];

export type Commit<SD extends CheckedStoreDefinition> = {
  <MutationName extends MutationKeysWithPayload<SD>>(
    mutation: MutationName, payload: MutationPayload<Mutations<SD>[MutationName]>
  ): void;

  <MutationName extends MutationKeysWithoutPayload<SD>>(
    mutation: MutationName
  ): void;
};

export type StoreCommit<SD extends CheckedStoreDefinition> = UnionToIntersection<{
  readonly [key in keyof Modules<SD>]: StoreCommit<Modules<SD>[key]>
}[keyof Modules<SD>]> & Commit<SD>;

/*type CommitMutationTransform<A> = A extends () => void ? () => void :
  A extends (payload: infer R) => void ? (payload: R) => void : never;

export type CommitableMutations<SD extends CheckedStoreDefinition> = Readonly<{
  [key in keyof Mutations<SD>]: CommitMutationTransform<Mutations<SD>[key]>
}>;

export type TypedRootCommit<SD extends CheckedStoreDefinition> = UnionToIntersection<{
  readonly [key in keyof Modules<SD>]: Namespaced<Modules<SD>[key]> extends true ? {
    readonly [k in key]: TypedRootCommit<Modules<SD>[key]>
  } : TypedRootCommit<Modules<SD>[key]>
}[keyof Modules<SD>]> & CommitableMutations<SD>;*/

export type Dispatch<SD extends CheckedStoreDefinition> = {
  <ActionName extends ActionKeysWithPayload<SD>>(
    action: ActionName, payload: ActionPayload<Actions<SD>[ActionName]>
  ): Promise<void>;

  <ActionName extends ActionKeysWithoutPayload<SD>>(
    action: ActionName
  ): Promise<void>;
};

export type StoreDispatch<SD extends CheckedStoreDefinition> = UnionToIntersection<{
  readonly [key in keyof Modules<SD>]: StoreDispatch<Modules<SD>[key]>
}[keyof Modules<SD>]> & Dispatch<SD>;

/* type ActionDispatchTransform<A> = A extends () => void | Promise<void> ? () => Promise<void> :
  A extends (payload: infer R) => void | Promise<void> ? (payload: R) => Promise<void> : never;

type DispatchableActions<SD extends CheckedStoreDefinition> = Readonly<{
  [key in keyof Actions<SD>]: ActionDispatchTransform<Actions<SD>[key]>
}>;

export type TypedRootDispatch<SD extends CheckedStoreDefinition> = UnionToIntersection<{
  readonly [key in keyof Modules<SD>]: Namespaced<Modules<SD>[key]> extends true ? {
    readonly [k in key]: TypedRootDispatch<Modules<SD>[key]>
  } : TypedRootDispatch<Modules<SD>[key]>
}[keyof Modules<SD>]> & DispatchableActions<SD>;*/

export type TypedStore<SD extends CheckedStoreDefinition> = Omit<Store<State<SD>>, "getters" | "commit" | "dispatch"> & {
  getters: StoreGetters<SD>
  commit: StoreCommit<SD>
  dispatch: StoreDispatch<SD>
}

/*
 * Implementation Types
 */

export type StateImplementation<SD extends CheckedStoreDefinition> = State<SD>;

type GetterImplementation<SD extends CheckedStoreDefinition, key extends keyof Getters<SD>> =
  (state: State<SD>, getters: Getters<SD>) => Getters<SD>[key];

export type GettersImplementation<SD extends CheckedStoreDefinition> = {
  [key in keyof Getters<SD>]: GetterImplementation<SD, key>
}

type IsMutationPayloadDefined<F> = F extends () => any ? false : true;

type MutationPayload<F> = IsMutationPayloadDefined<F> extends true ?
  (F extends (payload: infer P) => any ? P : never) : undefined;

type MutationImplementation<SD extends CheckedStoreDefinition, M extends (...args: any) => any> =
  IsMutationPayloadDefined<M> extends true ? (
    state: State<SD>, payload: MutationPayload<M>
  ) => ReturnType<M> : (
    state: State<SD>
  ) => ReturnType<M>;

export type MutationsImplementation<SD extends CheckedStoreDefinition> = {
  [key in keyof Mutations<SD>]: MutationImplementation<SD, Mutations<SD>[key]>;
}

type IsActionPayloadDefined<F> = F extends () => any ? false : true;

type ActionPayload<F> = IsActionPayloadDefined<F> extends true ?
  (F extends (payload: infer P) => any ? P : never) : undefined;

type ActionContext<SD extends CheckedStoreDefinition> = {
  dispatch: Dispatch<SD>;
  commit: Commit<SD>;
  state: State<SD>;
  getters: Getters<SD>;
}

type ActionHandlerImplementation<SD extends CheckedStoreDefinition, A extends (...args: any) => any> =
  IsActionPayloadDefined<A> extends true ? (
    context: ActionContext<SD>, payload: ActionPayload<A>
  ) => ReturnType<A> : (
    context: ActionContext<SD>
  ) => ReturnType<A>;

export type ActionsImplementation<SD extends CheckedStoreDefinition> = {
  [key in keyof Actions<SD>]: ActionHandlerImplementation<SD, Actions<SD>[key]>;
}

export type ModulesImplementation<SD extends CheckedStoreDefinition> = {
  [moduleName in keyof Modules<SD>]: StoreImplementation<Modules<SD>[moduleName]>;
}

type IsEmpty<T> = keyof T extends never ? true : false;

type EmptyKeys<T> = {
  [key in keyof T]: IsEmpty<T[key]> extends true ? key : never;
}[keyof T];

type NonEmptyKeys<T> = {
  [key in keyof T]: IsEmpty<T[key]> extends true ? never : key;
}[keyof T];

type OnlyEmpty<T> = {
  [key in EmptyKeys<T>]: T[key]
}

type OnlyNonEmpty<T> = {
  [key in NonEmptyKeys<T>]: T[key]
}

type MakeEmptyOptional<T> = OnlyNonEmpty<T> & Partial<OnlyEmpty<T>>;

export type StoreImplementation<SD extends CheckedStoreDefinition> = {
  state: StateImplementation<SD>,
  getters: GettersImplementation<SD>,
  mutations: MutationsImplementation<SD>,
  actions: ActionsImplementation<SD>,
  modules: ModulesImplementation<SD>
}; // & (Namespaced<SD> extends true ? { namespaced: true } : { namespaced?: false });
