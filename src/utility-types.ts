export type UnionToIntersection<U> =
  (U extends any ? (k: U)=>void : never) extends ((k: infer I)=>void) ? I : never;

export type HasPayload<F extends (...args: any) => any> = F extends () => any ? false : true;

export type Payload<F extends (arg: any) => any> = F extends (payload: infer P) => any ? P : undefined;
