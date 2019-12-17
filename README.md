# Vuex Typescript Support
This package provides typescript support for Vuex.

## Usage

Creating a store is now separated into its
type definition and its implementation definition.

An example of how to use this package can be found in
examples/basic-store/ and also has comments to explain
some useful information for using this package.

Most of the used generic types are self explanatory and
all exported ones can be found in the src/index.ts file.

## Errors

When defining a StoreDefinition or StoreModuleDefinition the fields that
are specified should use type instead of interface to implement their fields
as otherwise the error "Index signature is missing in type ..." can occur.

## Limitations

Since Typescript does not allow for augmenting keys, it is
currently not possible to implement namespaced modules behaviour
(Without adding a different getter style with different runtime
behaviour). Therefore at the moment only not namespaced modules are allowed.


Commit and Dispatch will not accept the payloadWithType syntax and will always require them as separate
parameters. While the support of the payloadWithType signature is easily implemented, it will greatly
reduce the readability of Typescript errors since there are many more overloads and signature styles
to consider. It would make the Typescript error messages of miss spellings of mutation/action names and
mismatched payload types completely unreadable and worthless.

Due to the recursive definition and usage of conditional types in the types
used, the error "TS2589: Type instantiation is excessively deep and possibly infinite."
can occur which usually means somewhere "any" was used and some recursively defined generic type is
not terminating.


Most behaviour of Vuex is typed properly and is not limited by the introduced types.
But it may be the case that some part of Vuex is still not properly typed or is even restricted by
the introduced types. This might especially be the case when newer versions of Vuex add new options,
since not all types use the Vuex defined options to define themselves.
