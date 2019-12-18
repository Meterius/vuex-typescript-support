# Vuex Typescript Support
This package provides typescript support for Vuex.

## Usage

Creating a store is now separated into its
type definition and its implementation.

Most of the used generic types are self explanatory and
all exported ones can be found in the src/index.ts file.

How the store is created and the types which are required
is documented in the examples/basic-store, where a Store with
one nested Store Module is implemented. The comments indicate
how types should be handled and what should be considered when using
this package. It is highly recommended to go thoroughly read all the files
in the example.

## Common Errors

##### "Index signature is missing in type ...":
When defining the States, Getters and so on for the StoreDefinition and StoreModuleDefinition,
use a Type Alias instead of an Interface to define them, since an Interface can cause the 
"Index signature is missing in type ..." error on the StoreDefinition or StoreModuleDefinition.

Which means instead of
```
interface SomeMutations {
    SET_FOO: (foo: string) => void;
    RESET_FOO: () => void;
};
```
just use this
```
type SomeMutations = {
    SET_FOO: (foo: string) => void;
    RESET_FOO: () => void;
};
```

##### "TS2589: Type instantiation is excessively deep and possibly infinite."
When "any" is used implicitly or explicitly in a Generic Type Alias it might cause a TS2589 error because some 
recursive type definitions may not terminate since they could expect the generic parameter to not extend something after
some amount of recursion.

If the error occurs at the createTypeStore call it is probably due to not explicitly
settings the createTypeStore generic parameter to the used StoreDefinition 
(see example/basic-store/implementation.ts for an example)

In general if the error occurs at any generic type alias or generic function you probably
need to explicitly fill in the generic parameter.

## Limitations

##### Namespacing
Since Typescript does not allow for augmenting keys, it is
currently not possible to implement namespaced modules behaviour
(Without adding a different getter style with different runtime
behaviour). Therefore at the moment only not namespaced modules are allowed.

##### Dynamic Module Registration
RegisterModule and UnregisterModule are not typed correctly since dynamic modules cannot be
typed statically.

##### PayloadWithType Commit and Dispatch Signature
Commit and Dispatch will not accept the payloadWithType syntax and will always require them as separate
parameters. While the support of the payloadWithType signature is easily implemented, it will greatly
reduce the readability of Typescript errors since there are many more overloads and signature styles
to consider. It would make the Typescript error messages of miss spellings of mutation/action names and
mismatched payload types completely unhelpful.

##### Missing Types and Type Restrictions
Most behaviour of Vuex is typed properly and is not limited by the introduced types.
But it may be the case that some part of Vuex is still not properly typed or is even restricted by
the introduced types. This might especially be the case when newer versions of Vuex add new options,
since not all types use the Vuex defined options to define themselves. If something is incompatibly typed
please create an issue on the github page.

##### Type Checking of incompatible Module Tree Hierarchies
If different Stores are used as Root Stores in the Store Modules this will not cause a Typescript error in
the creation of the definition, please note that it is important for all Store Modules inside the same Store to
only use the Store that they are contained in.

##### On Component Declaration
Since it is not current possible in Typescript to overwrite a previously declared interface property, the
$store property on the components will still be typed as Store\<any> since the node_modules/vuex/types/vue.d.ts
declares it. This means that either the store object is used directly instead of the this.$store property or
the local node_module/vuex packages is patched via for example [patch-package]("https://www.npmjs.com/package/patch-package").
(See examples/basic-store for an example of it can be done using patch-package)
