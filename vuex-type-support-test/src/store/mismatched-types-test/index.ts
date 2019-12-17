import { StoreDefinition, StoreModuleDefinition } from "vuex-typescript-support";

type Root1 = StoreDefinition<{
  State: { a: 1 };
  Getters: {};
  Mutations: {};
  Actions: {};
  Modules: {};
}>;

type Root2 = StoreDefinition<{
  State: { a: 1 };
  Getters: {};
  Mutations: {};
  Actions: {};
  Modules: {
  };
}>;

type Mod1 = StoreModuleDefinition<{
  Store: Root1;

  State: { m: 1 };
  Getters: {};
  Mutations: {};
  Actions: {};
  Modules: {
    m2: Mod2;
    m3: Mod3;
  };
}>;

type Mod2 = StoreModuleDefinition<{
  Store: Root1;

  State: { m: 2 };
  Getters: {};
  Mutations: {};
  Actions: {};
  Modules: {};
}>;

type Mod3 = StoreModuleDefinition<{
  Store: Root2;

  State: { m: 3 };
  Getters: {};
  Mutations: {};
  Actions: {};
  Modules: {};
}>;

type Mod4 = StoreModuleDefinition<{
  Store: Root2;

  State: { m: 4 };
  Getters: {};
  Mutations: {};
  Actions: {};
  Modules: {};
}>;
