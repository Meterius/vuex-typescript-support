import {Store, StoreOptions} from "vuex";
import {StoreCommit, StoreDispatch, StoreGetters, StoreImplementation, StoreState} from "./implementation-types";
import {AnyStoreDefinition, State} from "./definition-types";

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
