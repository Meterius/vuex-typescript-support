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
> = StoreModuleDefinition<R, any, any, any, any, any>;

export type AnyStoreDefinition = StoreDefinition<any, any, any, any, any>;

export type AnyStoreModuleDefinition = StoreModuleDefinition<any, any, any, any, any, any>;

export interface StoreDefinition<
  S extends AnyState,
  G extends AnyGetters,
  M extends AnyMutations,
  A extends AnyActions,
  MS extends AnyEquallyRootedModulesDefinition<
    StoreDefinition<S, G, M, A, MS>
  >
> {
  __StoreDefinition: true;
  __StoreModuleDefinition: false;

  State: S;
  Getters: G;
  Mutations: M;
  Actions: A;

  Modules: MS;
}

export interface StoreModuleDefinition<
  R extends AnyStoreDefinition,
  S extends AnyState,
  G extends AnyGetters,
  M extends AnyMutations,
  A extends AnyActions,
  MS extends AnyEquallyRootedModulesDefinition<R>
> {
  __StoreDefinition: false;
  __StoreModuleDefinition: true;

  Root: R;
  State: S;
  Getters: G;
  Mutations: M;
  Actions: A;
  Modules: MS;
}

export type Root<SMD extends AnyStoreModuleDefinition> = SMD["Root"];
export type State<SD extends AnyStoreDefinition | AnyStoreModuleDefinition> = SD["State"];
export type Getters<SD extends AnyStoreDefinition | AnyStoreModuleDefinition> = SD["Getters"];
export type Mutations<SD extends AnyStoreDefinition | AnyStoreModuleDefinition> = SD["Mutations"];
export type Actions<SD extends AnyStoreDefinition | AnyStoreModuleDefinition> = SD["Actions"];
export type Modules<SD extends AnyStoreDefinition | AnyStoreModuleDefinition> = SD["Modules"];
