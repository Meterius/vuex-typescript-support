export type UnionToIntersection<U> =
  (U extends any ? (k: U)=>void : never) extends ((k: infer I)=>void) ? I : never;

export type KeysWithoutPayload<FM extends Record<string, (...args: any) => any>> = {
  [key in keyof FM]: HasPayload<FM[key]> extends true ?
    never : key
}[keyof FM];

export type HasPayload<F extends (...args: any) => any> = F extends () => any ? false : true;

export type Payload<F extends (arg: any) => any> =
  HasPayload<F> extends true ? (F extends (payload: infer P) => any ? P : undefined) : undefined;

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
