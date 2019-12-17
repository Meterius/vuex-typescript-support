import {Store, StoreOptions} from "vuex";
import {AnyStoreDefinition, State, StoreCommit, StoreDispatch, StoreGetters, StoreState} from "./definition-types";
import {StoreImplementation} from "./implementation-types";

export type TypedStore<SD extends AnyStoreDefinition> = Omit<Store<any>, "state" | "getters" | "commit" | "dispatch"> & {
  readonly state: StoreState<SD>;
  readonly getters: StoreGetters<SD>;
  readonly commit: StoreCommit<SD>;
  readonly dispatch: StoreDispatch<SD>;
}

export function createTypedStore<
  SD extends AnyStoreDefinition,
>(
  storeConstructor: new (options: StoreOptions<any>) => Store<any>,
  storeImplementation: StoreImplementation<SD>
): TypedStore<SD> {
  return new storeConstructor(storeImplementation) as TypedStore<SD>;
}
