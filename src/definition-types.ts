import {KeysWithoutPayload, Payload, UnionToIntersection} from "./utility-types";

export type AnyMutation = (() => void) | ((payload: any) => void);
export type AnyAction = (() => Promise<void> | void) | ((payload: any) => Promise<void> | void);

export type AnyState = { [key: string]: any };
export type AnyGetters = { [key: string]: any };
export type AnyMutations = { [key: string]: AnyMutation };
export type AnyActions = { [key: string]: AnyMutation };

export type AnyEquallyRootedModulesDefinition<
  R extends AnyStoreDefinition
> = { [key: string]: AnyEquallyRootedStoreModuleDefinition<R> };

export type AnyEquallyRootedStoreModuleDefinition<
  R extends AnyStoreDefinition,
> = StoreModuleDefinition<{
  Store: R;
  State: any;
  Getters: any;
  Mutations: any;
  Actions: any;
  Modules: any;
}>;

export type AnyStoreDefinition = StoreDefinition<
  StoreDefinitionParameters<any, any, any, any, any>
>;

export type AnyStoreModuleDefinition = StoreModuleDefinition<
  StoreModuleDefinitionParameters<any, any, any, any, any, any>
>;

export interface StoreDefinitionParameters<
  S extends AnyState,
  G extends AnyGetters,
  M extends AnyMutations,
  A extends AnyActions,
  MS extends AnyEquallyRootedModulesDefinition<
    StoreDefinition<StoreDefinitionParameters<S, G, M, A, MS>>
  >
> {
  State: S;
  Getters: G;
  Mutations: M;
  Actions: A;
  Modules: MS;
}

export type StoreDefinition<
  P extends StoreDefinitionParameters<any, any, any, any, any>
> = {
  __StoreDefinition: true;
  __StoreModuleDefinition: false;

  State: P["State"];
  Getters: P["Getters"];
  Mutations: P["Mutations"];
  Actions: P["Actions"];
  Modules: P["Modules"];
}

export interface StoreModuleDefinitionParameters<
  R extends AnyStoreDefinition,
  S extends AnyState,
  G extends AnyGetters,
  M extends AnyMutations,
  A extends AnyActions,
  MS extends AnyEquallyRootedModulesDefinition<R>
  > {
  Store: R;
  State: S;
  Getters: G;
  Mutations: M;
  Actions: A;
  Modules: MS;
}

export type StoreModuleDefinition<
  P extends StoreModuleDefinitionParameters<any, any, any, any, any, any>
  > = {
  __StoreDefinition: false;
  __StoreModuleDefinition: true;

  Store: P["Store"];
  State: P["State"];
  Getters: P["Getters"];
  Mutations: P["Mutations"];
  Actions: P["Actions"];
  Modules: P["Modules"];
}

/*
    On Store Types
 */

export type RootStore<SD extends AnyStoreDefinition | AnyStoreModuleDefinition> =
  SD extends AnyStoreModuleDefinition ? SD["Store"] : SD;
export type State<SD extends AnyStoreDefinition | AnyStoreModuleDefinition> = SD["State"];
export type Getters<SD extends AnyStoreDefinition | AnyStoreModuleDefinition> = SD["Getters"];
export type Mutations<SD extends AnyStoreDefinition | AnyStoreModuleDefinition> = SD["Mutations"];
export type Actions<SD extends AnyStoreDefinition | AnyStoreModuleDefinition> = SD["Actions"];
export type Modules<SD extends AnyStoreDefinition | AnyStoreModuleDefinition> = SD["Modules"];

/*
    On Root Store Types
 */

type _StoreState<SD extends AnyStoreDefinition | AnyStoreModuleDefinition> = {
  [key in keyof Modules<SD>]: _StoreState<Modules<SD>[key]>
} & State<SD>

export type StoreState<SD extends AnyStoreDefinition | AnyStoreModuleDefinition> = _StoreState<RootStore<SD>>;

type _StoreGetters<SD extends AnyStoreDefinition | AnyStoreModuleDefinition> = UnionToIntersection<{
  readonly [key in keyof Modules<SD>]: _StoreGetters<Modules<SD>[key]>
}[keyof Modules<SD>]> & Getters<SD>;

export type StoreGetters<SD extends AnyStoreDefinition | AnyStoreModuleDefinition> = _StoreGetters<RootStore<SD>>;

export type _StoreMutations<SD extends AnyStoreDefinition | AnyStoreModuleDefinition> = UnionToIntersection<{
  readonly [key in keyof Modules<SD>]: _StoreMutations<Modules<SD>[key]>
}[keyof Modules<SD>]> & Mutations<SD>;

export type StoreMutations<SD extends AnyStoreDefinition | AnyStoreModuleDefinition> = _StoreMutations<RootStore<SD>>;

export type _StoreActions<SD extends AnyStoreDefinition | AnyStoreModuleDefinition> = UnionToIntersection<{
  readonly [key in keyof Modules<SD>]: _StoreActions<Modules<SD>[key]>
}[keyof Modules<SD>]> & Actions<SD>;

export type StoreActions<SD extends AnyStoreDefinition | AnyStoreModuleDefinition> = _StoreActions<RootStore<SD>>;

/*
    Commit and Dispatch Definitions
 */

type BaseCommitOptions = { silent?: boolean };
type BaseDispatchOptions = {};

export type StoreCommit<
  SD extends AnyStoreDefinition | AnyStoreModuleDefinition
  > = {
  <StoreMutationName extends keyof StoreMutations<SD>>(
    mutation: StoreMutationName,
    payload: Payload<StoreMutations<SD>[StoreMutationName]>,
    options?: BaseCommitOptions & { root?: boolean }
  ): void;

  <StoreMutationName extends KeysWithoutPayload<StoreMutations<SD>>>(
    mutation: StoreMutationName
  ): void;
};

export type StoreDispatch<
  SD extends AnyStoreDefinition | AnyStoreModuleDefinition
  > = {
  <StoreActionName extends keyof StoreActions<SD>>(
    action: StoreActionName,
    payload: Payload<StoreActions<SD>[StoreActionName]>,
    options?: BaseDispatchOptions & { root?: boolean }
  ): void;

  <StoreActionName extends KeysWithoutPayload<StoreActions<SD>>>(
    action: StoreActionName
  ): Promise<void>;
};

export type Commit<
  SD extends AnyStoreDefinition | AnyStoreModuleDefinition
  > = {
  <MutationName extends keyof Mutations<SD>>(
    mutation: MutationName,
    payload: Payload<Mutations<SD>[MutationName]>,
    options?: BaseCommitOptions & { root?: false }
  ): void;

  <StoreMutationName extends keyof StoreMutations<SD>>(
    mutation: StoreMutationName,
    payload: Payload<StoreMutations<SD>[StoreMutationName]>,
    options: BaseCommitOptions & { root: true }
  ): void;

  <MutationName extends KeysWithoutPayload<Mutations<SD>>>(
    mutation: MutationName
  ): void;
};

export type Dispatch<
  SD extends AnyStoreDefinition | AnyStoreModuleDefinition
  > = {
  <ActionName extends keyof Actions<SD>>(
    action: ActionName,
    payload: Payload<Actions<SD>[ActionName]>,
    options: BaseDispatchOptions & { root?: false }
  ): Promise<void>;

  <StoreActionName extends keyof StoreActions<SD>>(
    action: StoreActionName,
    payload: Payload<StoreActions<SD>[StoreActionName]>,
    options: BaseDispatchOptions & { root: true }
  ): void;

  <ActionName extends KeysWithoutPayload<Actions<SD>>>(
    action: ActionName
  ): Promise<void>;
};
