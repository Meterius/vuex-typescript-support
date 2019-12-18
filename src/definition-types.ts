import { UnionToIntersection } from "./utility-types";
import { CommitOptions, DispatchOptions } from "vuex";

export type AnyState = { [key: string]: any };
export type AnyGetters = { [key: string]: any };
export type AnyMutationPayloads = { [key: string]: any };
export type AnyActionsPayload = { [key: string]: any };

export type AnyModulesDefinition = { [key: string]: AnyStoreModuleDefinition };

export type AnyStoreDefinition = StoreDefinition<AnyStoreDefinitionParameters>;

export type AnyStoreModuleDefinition = StoreModuleDefinition<
  AnyStoreModuleDefinitionParameters
>;

type AnyStoreModuleDefinitionParameters = StoreModuleDefinitionParameters<
  AnyStoreDefinition, AnyState, AnyGetters, AnyMutationPayloads, AnyActionsPayload, AnyModulesDefinition
>;

type AnyStoreDefinitionParameters = StoreDefinitionParameters<
  AnyState, AnyGetters, AnyMutationPayloads, AnyActionsPayload, AnyModulesDefinition
>;

export interface StoreDefinitionParameters<
  S extends AnyState,
  G extends AnyGetters,
  M extends AnyMutationPayloads,
  A extends AnyActionsPayload,
  MS extends AnyModulesDefinition,
> {
  State: S;
  Getters: G;
  MutationPayloads: M;
  ActionPayloads: A;
  Modules: MS;
}

export type StoreDefinition<
  P extends AnyStoreDefinitionParameters
> = {
  __StoreDefinition: true;
  __StoreModuleDefinition: false;

  State: P["State"];
  Getters: P["Getters"];
  MutationPayloads: P["MutationPayloads"];
  ActionPayloads: P["ActionPayloads"];
  Modules: P["Modules"];
}

export interface StoreModuleDefinitionParameters<
  R extends AnyStoreDefinition,
  S extends AnyState,
  G extends AnyGetters,
  M extends AnyMutationPayloads,
  A extends AnyActionsPayload,
  MS extends AnyModulesDefinition,
  > {
  Store: R;
  State: S;
  Getters: G;
  MutationPayloads: M;
  ActionPayloads: A;
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
  MutationPayloads: P["MutationPayloads"];
  ActionPayloads: P["ActionPayloads"];
  Modules: P["Modules"];
}

/*
    On Store Types
 */

type ParseAction<P> = undefined extends P ?
  ((payload?: P) => Promise<void>) : ((payload: P) => Promise<void>);

type ParseMutation<P> = undefined extends P ?
  ((payload?: P) => void) : ((payload: P) => void);

export type RootStore<SD extends AnyStoreDefinition | AnyStoreModuleDefinition> =
  SD extends AnyStoreModuleDefinition ? SD["Store"] : SD;
export type State<SD extends AnyStoreDefinition | AnyStoreModuleDefinition> = SD["State"];
export type Getters<SD extends AnyStoreDefinition | AnyStoreModuleDefinition> = SD["Getters"];
export type ActionPayloads<SD extends AnyStoreDefinition | AnyStoreModuleDefinition> = SD['ActionPayloads'];
export type MutationPayloads<SD extends AnyStoreDefinition | AnyStoreModuleDefinition> = SD['MutationPayloads'];

export type Mutations<SD extends AnyStoreDefinition | AnyStoreModuleDefinition> = {
  [key in keyof MutationPayloads<SD>]: ParseMutation<MutationPayloads<SD>[key]>;
};

export type Actions<SD extends AnyStoreDefinition | AnyStoreModuleDefinition> = {
  [key in keyof ActionPayloads<SD>]: ParseAction<ActionPayloads<SD>[key]>;
};

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

type _StoreMutationPayloads<SD extends AnyStoreDefinition | AnyStoreModuleDefinition> = UnionToIntersection<{
  readonly [key in keyof Modules<SD>]: _StoreMutationPayloads<Modules<SD>[key]>
}[keyof Modules<SD>]> & MutationPayloads<SD>;

export type StoreMutationPayloads<SD extends AnyStoreDefinition | AnyStoreModuleDefinition> = _StoreMutationPayloads<RootStore<SD>>;

type _StoreActionPayloads<SD extends AnyStoreDefinition | AnyStoreModuleDefinition> = UnionToIntersection<{
  readonly [key in keyof Modules<SD>]: _StoreActionPayloads<Modules<SD>[key]>
}[keyof Modules<SD>]> & ActionPayloads<SD>;

export type StoreActionPayloads<SD extends AnyStoreDefinition | AnyStoreModuleDefinition> = _StoreActionPayloads<RootStore<SD>>;

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

export type OptionalKeys<FM extends Record<string, (...args: any) => any>> = {
  [key in keyof FM]: undefined extends FM[key] ?
    key : never
}[keyof FM];

export type RequiredKeys<FM extends Record<string, (...args: any) => any>> = {
  [key in keyof FM]: undefined extends FM[key] ?
    never : key
}[keyof FM];

export type SomeMutationPayloadWithType<SD extends AnyStoreDefinition> = {
  [key in keyof StoreMutationPayloads<SD>]: PayloadWithType<key, StoreMutationPayloads<SD>[key]>
}[keyof StoreMutationPayloads<SD>];

export type SomeActionPayloadWithType<SD extends AnyStoreDefinition> = {
  [key in keyof StoreActionPayloads<SD>]: PayloadWithType<key, StoreActionPayloads<SD>[key]>
}[keyof StoreActionPayloads<SD>];

export type PayloadWithType<T, P> = {
   type: T;
} & (undefined extends P ? {
   payload?: P;
} : {
   payload: P;
});

type BaseCommitOptions = Omit<CommitOptions, "root">;
type BaseDispatchOptions = Omit<DispatchOptions, "root">;

export type StoreCommit<
  SD extends AnyStoreDefinition | AnyStoreModuleDefinition
  > = {
  <StoreMutationName extends RequiredKeys<StoreMutationPayloads<SD>>>(
    type: StoreMutationName,
    payload: StoreMutationPayloads<SD>[StoreMutationName],
    options?: BaseCommitOptions & { root?: boolean }
  ): void;
  <StoreMutationName extends OptionalKeys<StoreMutationPayloads<SD>>>(
    type: StoreMutationName,
    payload?: StoreMutationPayloads<SD>[StoreMutationName],
    options?: BaseCommitOptions & { root?: boolean }
  ): void;
};

export type StoreDispatch<
  SD extends AnyStoreDefinition | AnyStoreModuleDefinition
  > = {
  <StoreActionName extends RequiredKeys<StoreActionPayloads<SD>>>(
    type: StoreActionName,
    payload: StoreActionPayloads<SD>[StoreActionName],
    options?: BaseDispatchOptions & { root?: boolean }
  ): void;
  <StoreActionName extends OptionalKeys<StoreActionPayloads<SD>>>(
    type: StoreActionName,
    payload?: StoreActionPayloads<SD>[StoreActionName],
    options?: BaseDispatchOptions & { root?: boolean }
  ): void;
};

export type Commit<
  SD extends AnyStoreDefinition | AnyStoreModuleDefinition
  > = {
  <MutationName extends RequiredKeys<MutationPayloads<SD>>>(
    type: MutationName,
    payload: MutationPayloads<SD>[MutationName],
    options?: BaseCommitOptions & { root?: false }
  ): void;
  <MutationName extends OptionalKeys<MutationPayloads<SD>>>(
    type: MutationName,
    payload?: MutationPayloads<SD>[MutationName],
    options?: BaseCommitOptions & { root?: false }
  ): void;

  <StoreMutationName extends keyof StoreMutationPayloads<SD>>(
    type: StoreMutationName,
    payload: StoreMutationPayloads<SD>[StoreMutationName],
    options: BaseCommitOptions & { root: true }
  ): void;
};

export type Dispatch<
  SD extends AnyStoreDefinition | AnyStoreModuleDefinition
  > = {
  <ActionName extends RequiredKeys<ActionPayloads<SD>>>(
    type: ActionName,
    payload: ActionPayloads<SD>[ActionName],
    options?: BaseDispatchOptions & { root?: false }
  ): void;
  <ActionName extends OptionalKeys<ActionPayloads<SD>>>(
    type: ActionName,
    payload?: ActionPayloads<SD>[ActionName],
    options?: BaseDispatchOptions & { root?: false }
  ): void;

  <StoreActionName extends keyof StoreActionPayloads<SD>>(
    type: StoreActionName,
    payload: StoreActionPayloads<SD>[StoreActionName],
    options: BaseDispatchOptions & { root: true }
  ): void;
};
