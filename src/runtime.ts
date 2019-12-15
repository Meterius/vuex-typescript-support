import {
  CheckedStoreDefinition,
  StoreImplementation,
  State,
  TypedRootGetters,
  TypedRootDispatch, TypedRootCommit, TypedStore
} from "./types";
import { StoreOptions, Store } from "vuex";

type CheckedRootStoreDefinition = CheckedStoreDefinition<any, any, any, any, any, "false">;

type RootStoreImplementation<SD extends CheckedRootStoreDefinition> =
  Omit<StoreImplementation<SD>, "namespaced"> & { namespaced?: never };

function constructTypedRoot<SD extends CheckedStoreDefinition, R>(
  rootName: string,
  retriever: (globalKey: string, root: R) => any,
  rootRetriever: () => R,
  store: RootStoreImplementation<SD>,
  prefix: string = "",
  base: any = {},
): any {
  Object.keys(store[rootName] || {}).forEach(
    (key) => {
      Object.defineProperty(base, key, {
        get: () => {
          const root = rootRetriever();

          return retriever(`${prefix}${key}`, root);
        },
      })
    }
  );

  Object.entries(store["modules"] || {}).forEach(
    ([moduleName, moduleStore]: [string, any]) => {
      const moduleTypedGetters = constructTypedRoot(
        rootName, retriever, rootRetriever, moduleStore,
        moduleStore.namespaced ? moduleName + "/" : "",
        moduleStore.namespaced ? {} : base,
      );

      if(moduleStore.namespaced){
        base[moduleName] = moduleTypedGetters;
      }
    }
  );

  return base;
}

function constructTypedRootGetters<SD extends CheckedStoreDefinition>(
  rootGettersRetriever: () => any,
  store: RootStoreImplementation<SD>,
  prefix?: string,
  base?: any,
): TypedRootGetters<SD> {
  return constructTypedRoot(
    "getters", (key, root) => root[key], rootGettersRetriever, store, prefix, base,
  );
}

export function buildStoreOptions<
  SD extends CheckedRootStoreDefinition
>(store: RootStoreImplementation<SD>): StoreOptions<State<SD>> {
  const options: StoreOptions<State<SD>> = {
    state: store["state"] || {},
    getters: store["getters"] || {},
    mutations: store["mutations"] || {},
    actions: store["actions"] || {},
    modules: store["modules"] || {},
  };

  return options;
}

export function buildTypedStore<SD extends CheckedRootStoreDefinition>(
  store: Store<SD>, storeImplementation: RootStoreImplementation<SD>
): TypedStore<SD> {
  return Object.assign(store, {
    typedGetters: constructTypedRootGetters(
      () => store.getters, storeImplementation,
    ),
  });
}
