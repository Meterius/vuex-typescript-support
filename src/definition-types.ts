import { KeysWithoutPayload, Payload, UnionToIntersection } from "./utility-types";
import { CommitOptions, DispatchOptions } from "vuex";

export type AnyMutation = (() => void) | ((payload: any) => void);
export type AnyAction = (() => Promise<void> | void) | ((payload: any) => Promise<void> | void);

export type AnyState = { [key: string]: any };
export type AnyGetters = { [key: string]: any };
export type AnyMutations = { [key: string]: AnyMutation };
export type AnyActions = { [key: string]: AnyMutation };

export type AnyModulesDefinition= { [key: string]: AnyStoreModuleDefinition };

export type AnyStoreDefinition = StoreDefinition<AnyStoreDefinitionParameters>;

export type AnyStoreModuleDefinition = StoreModuleDefinition<
  AnyStoreModuleDefinitionParameters
>;

type AnyStoreModuleDefinitionParameters = StoreModuleDefinitionParameters<
  AnyStoreDefinition, AnyState, AnyGetters, AnyMutations, AnyActions, AnyModulesDefinition
>;

type AnyStoreDefinitionParameters = StoreDefinitionParameters<
  AnyState, AnyGetters, AnyMutations, AnyActions, AnyModulesDefinition
>;

export interface StoreDefinitionParameters<
  S extends AnyState,
  G extends AnyGetters,
  M extends AnyMutations,
  A extends AnyActions,
  MS extends AnyModulesDefinition,
> {
  State: S;
  Getters: G;
  Mutations: M;
  Actions: A;
  Modules: MS;
}

export type StoreDefinition<
  P extends AnyStoreDefinitionParameters
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
  MS extends AnyModulesDefinition,
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

export type SomeMutationPayloadWithType<SD extends AnyStoreDefinition> = {
  [key in keyof StoreMutations<SD>]: PayloadWithType<key, Payload<StoreMutations<SD>[key]>>
}[keyof StoreMutations<SD>];

export type SomeActionPayloadWithType<SD extends AnyStoreDefinition> = {
  [key in keyof StoreActions<SD>]: PayloadWithType<key, Payload<StoreActions<SD>[key]>>
}[keyof StoreActions<SD>];

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
  <StoreMutationName extends keyof StoreMutations<SD>>(
    type: StoreMutationName,
    payload: Payload<StoreMutations<SD>[StoreMutationName]>,
    options?: BaseCommitOptions & { root?: boolean }
  ): void;
  // <StoreMutationName extends keyof StoreMutations<SD>>(
  //   payloadWithType: PayloadWithType<StoreMutationName, Payload<StoreMutations<SD>[StoreMutationName]>>,
  //   options?: BaseCommitOptions & { root?: boolean }
  // ): void;

  <StoreMutationName extends KeysWithoutPayload<StoreMutations<SD>>>(
    payloadWithType: StoreMutationName
  ): void;
  // <StoreMutationName extends KeysWithoutPayload<StoreMutations<SD>>>(
  //   payloadWithType: PayloadWithType<StoreMutationName, undefined>
  // ): void;
};

export type StoreDispatch<
  SD extends AnyStoreDefinition | AnyStoreModuleDefinition
  > = {
  <StoreActionName extends keyof StoreActions<SD>>(
    type: StoreActionName,
    payload: Payload<StoreActions<SD>[StoreActionName]>,
    options?: BaseDispatchOptions & { root?: boolean }
  ): Promise<void>;
  // <StoreActionName extends keyof StoreActions<SD>>(
  //   payloadWithType: PayloadWithType<StoreActionName, Payload<StoreActions<SD>[StoreActionName]>>,
  //   options?: BaseDispatchOptions & { root?: boolean }
  // ): Promise<void>;

  <StoreActionName extends KeysWithoutPayload<StoreActions<SD>>>(
    type: StoreActionName
  ): Promise<void>;
  // <StoreActionName extends KeysWithoutPayload<StoreActions<SD>>>(
  //   payloadWithType: PayloadWithType<StoreActionName, undefined>
  // ): Promise<void>;
};

export type Commit<
  SD extends AnyStoreDefinition | AnyStoreModuleDefinition
  > = {
  <MutationName extends keyof Mutations<SD>>(
    type: MutationName,
    payload: Payload<Mutations<SD>[MutationName]>,
    options?: BaseCommitOptions & { root?: false }
  ): void;
  // <MutationName extends keyof Mutations<SD>>(
  //   payloadWithType: PayloadWithType<MutationName, Payload<Mutations<SD>[MutationName]>>,
  //   options?: BaseCommitOptions & { root?: false }
  // ): void;

  <StoreMutationName extends keyof StoreMutations<SD>>(
    type: StoreMutationName,
    payload: Payload<StoreMutations<SD>[StoreMutationName]>,
    options: BaseCommitOptions & { root: true }
  ): void;
  // <StoreMutationName extends keyof StoreMutations<SD>>(
  //   payloadWithType: PayloadWithType<StoreMutationName, Payload<StoreMutations<SD>[StoreMutationName]>>,
  //   options: BaseCommitOptions & { root: true }
  // ): void;

  <MutationName extends KeysWithoutPayload<Mutations<SD>>>(
    type: MutationName
  ): void;
  // <MutationName extends KeysWithoutPayload<Mutations<SD>>>(
  //   payloadWithType: PayloadWithType<MutationName, undefined>
  // ): void;
};

export type Dispatch<
  SD extends AnyStoreDefinition | AnyStoreModuleDefinition
  > = {
  <ActionName extends keyof Actions<SD>>(
    type: ActionName,
    payload: Payload<Actions<SD>[ActionName]>,
    options?: BaseDispatchOptions & { root?: false }
  ): Promise<void>;
  // <ActionName extends keyof Actions<SD>>(
  //   payloadWithType: PayloadWithType<ActionName, Payload<Actions<SD>[ActionName]>>,
  //   options?: BaseDispatchOptions & { root?: false }
  // ): Promise<void>;

  <StoreActionName extends keyof StoreActions<SD>>(
    type: StoreActionName,
    payload: Payload<StoreActions<SD>[StoreActionName]>,
    options: BaseDispatchOptions & { root: true }
  ): Promise<void>;
  // <StoreActionName extends keyof StoreActions<SD>>(
  //   payloadWithType: PayloadWithType<StoreActionName, Payload<StoreActions<SD>[StoreActionName]>>,
  //   options: BaseDispatchOptions & { root: true }
  // ): Promise<void>;

  <ActionName extends KeysWithoutPayload<Actions<SD>>>(
    type: ActionName
  ): Promise<void>;
  // <ActionName extends KeysWithoutPayload<Actions<SD>>>(
  //   payloadWithType: PayloadWithType<ActionName, undefined>
  // ): Promise<void>;
};
