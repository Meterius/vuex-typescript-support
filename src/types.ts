/*
 * Store Definition Types
 */

type IsStrictTrueOrFalse<T extends boolean> = T extends true ?
  (T extends false ? false : true) : true;

type NotExtendingKeys<T, E> = {
  [key in keyof T]: T[key] extends E ? never : key
}[keyof T];

type OnlyAllowedValues<T, E> = T[keyof T] extends E ? true : false;

type ConditionFunction = (...args: any) => any;

type ConditionNotMoreThanOneParameter = (primary?: any) => any;

type ConditionCheckedStoreDefinition = CheckedStoreDefinition;

type StoreDefinitionError<State, Getters, Mutations, Actions, Modules, Namespaced extends boolean> = OnlyAllowedValues<Mutations, ConditionFunction> extends false ?
  { error: 'Static Type Error: Some Mutations Are Not Functions', mutations: NotExtendingKeys<Mutations, ConditionFunction> }
  : OnlyAllowedValues<Mutations, ConditionNotMoreThanOneParameter> extends false ?
  { error: 'Static Type Error: Some Mutations Have More Than One Parameter', mutations: NotExtendingKeys<Mutations, ConditionNotMoreThanOneParameter> }
  : OnlyAllowedValues<Actions, ConditionFunction> extends false ?
  { error: 'Static Type Error: Some Actions Are Not Functions', actions: NotExtendingKeys<Actions, ConditionFunction> }
  : OnlyAllowedValues<Actions, ConditionNotMoreThanOneParameter> extends false ?
  { error: 'Static Type Error: Some Actions Have More Than One Parameter', actions: NotExtendingKeys<Actions, ConditionNotMoreThanOneParameter> }
  : OnlyAllowedValues<Modules, ConditionCheckedStoreDefinition> extends false ?
  { error: 'Static Type Error: Some Modules Are Not Valid Store Definitions', modules: NotExtendingKeys<Modules, ConditionCheckedStoreDefinition> }
  : IsStrictTrueOrFalse<Namespaced> extends false ?
  { error: 'Static Type Error: Namespaced Needs To be True Or False' }
  : undefined;

type ReturnNotUndefined<A, B> = A extends undefined ? B : A;

export type StoreDefinition<
  State,
  Getters,
  Mutations,
  Actions,
  Modules = {},
  Namespaced extends boolean = false,
> =
  ReturnNotUndefined<
    StoreDefinitionError<State, Getters, Mutations, Actions, Modules, Namespaced>,
    CheckedStoreDefinition<State, Getters, Mutations, Actions, Modules, Namespaced>
  >;

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
  Namespaced: Namespaced;
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
