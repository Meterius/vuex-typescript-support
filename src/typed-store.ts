import { WatchOptions } from "vue";
import {
  Store,
  StoreOptions
} from "vuex";
import {
  AnyStoreDefinition,
  SomeActionPayloadWithType,
  SomeMutationPayloadWithType,
  StoreCommit,
  StoreDispatch,
  StoreGetters,
  StoreState
} from "./definition-types";
import { StoreImplementation } from "./implementation-types";
import { Overwrite } from "./utility-types";

/**
 *    Subscribe Actions Options Definition
 */

export type MutationSubscriber<SD extends AnyStoreDefinition> =
  (mutation: SomeMutationPayloadWithType<SD>, state: StoreState<SD>) => any;

export type ActionSubscriber<SD extends AnyStoreDefinition> =
  (action: SomeActionPayloadWithType<SD>, state: StoreState<SD>) => any;

export interface ActionSubscribersObject<SD extends AnyStoreDefinition> {
  before?: ActionSubscriber<SD>;
  after?: ActionSubscriber<SD>;
}

export type SubscribeActionOptions<SD extends AnyStoreDefinition> =
  ActionSubscriber<SD> | ActionSubscribersObject<SD>;

/*
    Typed Store Definition
 */

export type TypedStore<SD extends AnyStoreDefinition> =
  Overwrite<Store<any>, {
    readonly state: StoreState<SD>;
    readonly getters: StoreGetters<SD>;

    replaceState(state: StoreState<SD>): void;

    commit: StoreCommit<SD>;
    dispatch: StoreDispatch<SD>;

    subscribe(fn: MutationSubscriber<SD>): () => void;
    subscribeAction(fn: SubscribeActionOptions<SD>): () => void;

    watch<T>(
      getter: (state: StoreState<SD>, getters: StoreGetters<SD>) => T,
      cb: (value: T, oldValue: T) => void,
      options?: WatchOptions
    ): () => void;

    hotUpdate(options: Partial<Pick<
      StoreImplementation<SD>, "actions" | "modules" | "mutations" | "getters"
    >>): void;
  }>;

export function createTypedStore<
  SD extends AnyStoreDefinition,
>(
  createStore: (options: StoreOptions<any>) => Store<any>,
  storeImplementation: StoreImplementation<SD>
): TypedStore<SD> {
  // @ts-ignore
  return createStore(storeImplementation) as TypedStore<SD>;
}
