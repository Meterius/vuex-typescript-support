/*
 * Store Definition Types
 */

type NotExtendingKeys<T extends {}, E> = {
  [key in keyof T]: T[key] extends E ? never : key
}[keyof T];

type ValueTypes<T extends {}> = keyof T extends never ? never : T[keyof T];

type AnyFunction = (...args: any) => any;

type AnyFunctionWithNotMoreThanOneParameter = (primary?: any) => any;

type TestValues<T extends {}, ERR extends string, E, R> =
  ValueTypes<T> extends E ? R : { error: ERR; keys: NotExtendingKeys<T, E>; };

export type StoreDefinition<
  State extends {},
  Getters extends {},
  Mutations extends {},
  Actions extends {},
  Modules extends {} = {},
  Namespaced extends "true" | "false" = "false",
> = TestValues<
    Mutations, "Static Error Type: Some Mutations Are Not Functions", AnyFunction,
  TestValues<
    Mutations, "Static Error Type: Some Mutations Have More Than One Parameter", AnyFunctionWithNotMoreThanOneParameter,
  TestValues<
    Actions, "Static Error Type: Some Actions Are Not Functions", AnyFunction,
  TestValues<
    Actions, "Static Error Type: Some Actions Have More Than One Parameter", AnyFunctionWithNotMoreThanOneParameter,
  TestValues<
    Modules, "Static Error Type: Some Modules Are Not Valid Store Definitions", CheckedStoreDefinition,
    CheckedStoreDefinition<State, Getters, Mutations, Actions, Modules, Namespaced>
  >>>>>;

export type CheckedStoreDefinition<
  State = any,
  Getters = any,
  Mutations = any,
  Actions = any,
  Modules = any,
  Namespaced = any,
  > = {
  State: State;
  Getters: Getters;
  Mutations: Mutations;
  Actions: Actions;
  Modules: Modules;
  Namespaced: Namespaced extends "true" ? true : false;
};

/*
 * Checked Store Definition Types
 */

export type State<SD extends CheckedStoreDefinition> = SD['State'];

export type Getters<SD extends CheckedStoreDefinition> = SD['Getters'];

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

export type Namespaced<SD extends CheckedStoreDefinition> = SD['Namespaced'];

export type Commit<SD extends CheckedStoreDefinition> = {
  <MutationName extends MutationKeysWithPayload<SD>>(
    mutation: MutationName, payload: MutationPayload<Mutations<SD>[MutationName]>
  ): void;

  <MutationName extends MutationKeysWithoutPayload<SD>>(
    mutation: MutationName
  ): void;
};

export type Dispatch<SD extends CheckedStoreDefinition> = {
  <ActionName extends ActionKeysWithPayload<SD>>(
    action: ActionName, payload: ActionPayload<Actions<SD>[ActionName]>
  ): Promise<void>;

  <ActionName extends ActionKeysWithoutPayload<SD>>(
    action: ActionName
  ): Promise<void>;
};

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

export type StoreImplementation<SD extends CheckedStoreDefinition> = MakeEmptyOptional<{
  state: StateImplementation<SD>,
  getters: GettersImplementation<SD>,
  mutations: MutationsImplementation<SD>,
  actions: ActionsImplementation<SD>,
  modules: ModulesImplementation<SD>
}>;
