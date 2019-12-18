export type UnionToIntersection<U> =
  (U extends any ? (k: U)=>void : never) extends ((k: infer I)=>void) ? I : never;

export type Overwrite<Base extends {}, OverwriteExtension extends {}> =
  Omit<Base, keyof OverwriteExtension> & OverwriteExtension;

type PartialKeys<T extends {}> = {
  [key in keyof T]: undefined extends T[key] ? key : never
}[keyof T];

type NotPartialKeys<T extends {}> = {
  [key in keyof T]: undefined extends T[key] ? never : key
}[keyof T];

export type Partialize<T extends {}> = {
  [key in PartialKeys<T>]?: T[key]
} & {
  [key in NotPartialKeys<T>]: T[key]
};
