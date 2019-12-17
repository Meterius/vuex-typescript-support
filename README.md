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

## Limitations

As typescript does not allow for augmenting keys, it is
currently not possible to implement namespaced modules behaviour
without adding a different getter style with different runtime
behaviour. Therefore at the moment only non namespaced modules are allowed.


Due to the recursive and complex nature of the generic types
used to implement all the required typings, it seemingly often
happens that one runs into the "TS2589: Type instantiation is excessively deep and possibly infinite."
typescript error. This is due to the hard coded limit of a maximum recursion depth of
50 typescript enforces. (This might be configurable in Typescript 3.8)
