import { UnionToIntersection } from "./utility-types";
import { CommitOptions, DispatchOptions } from "vuex";

export type AnyMutation = (() => void) | ((payload: any) => void);
export type AnyAction = (() => Promise<void>) | ((payload: any) => Promise<void>);

export type AnyState = { [key: string]: any };
export type AnyGetters = { [key: string]: any };
export type AnyMutations = { [key: string]: AnyMutation };
export type AnyActions = { [key: string]: AnyAction };

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
  Mutations: TransformMutationsInput<P["Mutations"]>;
  Actions: TransformActionsInput<P["Actions"]>;
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
  Mutations: TransformMutationsInput<P["Mutations"]>;
  Actions: TransformActionsInput<P["Actions"]>;
  Modules: P["Modules"];
}

type TransformActionsInput<A extends AnyActions> = {
  [key in keyof A]: TransformActionInput<A[key]>
}

type TransformMutationsInput<M extends AnyMutations> = {
  [key in keyof M]: TransformMutationInput<M[key]>
}

type TransformMutationInput<F extends (...args: any) => any> =
  HasPayload<F> extends true ?
    (HasOptionalPayload<F> extends true ? ((payload?: Payload<F>) => void) : ((payload: Payload<F>) => void)) :
    (() => void);

type TransformActionInput<F extends (...args: any) => any> =
  HasPayload<F> extends true ?
    (HasOptionalPayload<F> extends true ? ((payload?: Payload<F>) => Promise<void>) : ((payload: Payload<F>) => Promise<void>)) :
    (() => Promise<void>);

/*
    On Store Types
 */

export type RootStore<SD extends AnyStoreDefinition | AnyStoreModuleDefinition> =
  SD extends AnyStoreModuleDefinition ? SD["Store"] : SD;
export type State<SD extends AnyStoreDefinition | AnyStoreModuleDefinition> = SD["State"];
export type Getters<SD extends AnyStoreDefinition | AnyStoreModuleDefinition> = Readonly<SD["Getters"]>;
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

export type KeysWithOptionalPayload<FM extends Record<string, (...args: any) => any>> = {
  [key in keyof FM]: HasOptionalPayload<FM[key]> extends true ?
    key : never
}[keyof FM];

export type KeysWithRequiredPayload<FM extends Record<string, (...args: any) => any>> = {
  [key in keyof FM]: HasOptionalPayload<FM[key]> extends false ?
    key : never
}[keyof FM];

export type HasOptionalPayload<F> = F extends () => any ? true : false;

export type Payload<F> = HasPayload<F> extends true ? (F extends (payload: infer P) => any ? P : undefined) : undefined;

export type HasPayload<F> = ((any extends (F extends (payload: infer P) => any ? P : any) ? never : any) extends never ? 1 : 0) extends 1 ? false : true;

export type SomeMutationPayloadWithType<SD extends AnyStoreDefinition> = {
  [key in keyof StoreMutations<SD>]: PayloadWithType<key, StoreMutations<SD>[key]>
}[keyof StoreMutations<SD>];

export type SomeActionPayloadWithType<SD extends AnyStoreDefinition> = {
  [key in keyof StoreActions<SD>]: PayloadWithType<key, StoreActions<SD>[key]>
}[keyof StoreActions<SD>];

export type PayloadWithType<T, F> = {
  type: T;
  payload:
    HasPayload<F> extends true ? (HasOptionalPayload<F> extends true ? Payload<F> | undefined : Payload<F>)
      : undefined;
};

type BaseCommitOptions = Omit<CommitOptions, "root">;
type BaseDispatchOptions = Omit<DispatchOptions, "root">;

export type StoreCommit<
  SD extends AnyStoreDefinition | AnyStoreModuleDefinition
  > = {
  <StoreMutationName extends KeysWithRequiredPayload<StoreMutations<SD>>>(
    type: StoreMutationName,
    payload: Payload<StoreMutations<SD>[StoreMutationName]>,
    options?: BaseCommitOptions & { root?: boolean }
  ): void;
  <StoreMutationName extends KeysWithOptionalPayload<StoreMutations<SD>>>(
    type: StoreMutationName,
    payload?: Payload<StoreMutations<SD>[StoreMutationName]>,
    options?: BaseCommitOptions & { root?: boolean }
  ): void;
};

export type StoreDispatch<
  SD extends AnyStoreDefinition | AnyStoreModuleDefinition
  > = {
  <StoreActionName extends KeysWithRequiredPayload<StoreActions<SD>>>(
    type: StoreActionName,
    payload: Payload<StoreActions<SD>[StoreActionName]>,
    options?: BaseDispatchOptions & { root?: boolean }
  ): Promise<void>;
  <StoreActionName extends KeysWithOptionalPayload<StoreActions<SD>>>(
    type: StoreActionName,
    payload?: Payload<StoreActions<SD>[StoreActionName]>,
    options?: BaseDispatchOptions & { root?: boolean }
  ): Promise<void>;
};

export type Commit<
  SD extends AnyStoreDefinition | AnyStoreModuleDefinition
  > = {
  <MutationName extends KeysWithRequiredPayload<Mutations<SD>>>(
    type: MutationName,
    payload: Payload<Mutations<SD>[MutationName]>,
    options?: BaseCommitOptions & { root?: false }
  ): void;
  <MutationName extends KeysWithOptionalPayload<Mutations<SD>>>(
    type: MutationName,
    payload?: Payload<Mutations<SD>[MutationName]>,
    options?: BaseCommitOptions & { root?: false }
  ): void;

  <StoreMutationName extends keyof StoreMutations<SD>>(
    type: StoreMutationName,
    payload: Payload<StoreMutations<SD>[StoreMutationName]>,
    options: BaseCommitOptions & { root: true }
  ): void;
};

export type Dispatch<
  SD extends AnyStoreDefinition | AnyStoreModuleDefinition
  > = {
  <ActionName extends KeysWithRequiredPayload<Actions<SD>>>(
    type: ActionName,
    payload: Payload<Actions<SD>[ActionName]>,
    options?: BaseDispatchOptions & { root?: false }
  ): Promise<void>;
  <ActionName extends KeysWithOptionalPayload<Actions<SD>>>(
    type: ActionName,
    payload?: Payload<Actions<SD>[ActionName]>,
    options?: BaseDispatchOptions & { root?: false }
  ): Promise<void>;

  <StoreActionName extends keyof StoreActions<SD>>(
    type: StoreActionName,
    payload: Payload<StoreActions<SD>[StoreActionName]>,
    options: BaseDispatchOptions & { root: true }
  ): Promise<void>;
};
