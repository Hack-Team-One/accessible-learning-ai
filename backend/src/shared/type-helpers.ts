import { Pagination } from 'nestjs-typeorm-paginate';
import { BaseEntity, DeepPartial } from 'typeorm';
import { QueryDeepPartialEntity } from 'typeorm/query-builder/QueryPartialEntity';
import { AuditableEntity } from './entities/auditable-entity';

export type ExpandArrayElement<T> = T extends Date
  ? T
  : // TODO: [TYPE] handle case where function also has properties
    T extends Function
    ? T
    : T extends object
      ? T extends infer O
        ? { [K in keyof O]: O[K] }
        : never
      : T;

// expands object types one level deep
export type Expand<T> = T extends Date
  ? T
  : // TODO: [TYPE] handle case where array also has properties
    T extends Array<infer E>
    ? Array<ExpandArrayElement<E>>
    : // TODO: [TYPE] handle case where function also has properties
      T extends Function
      ? T
      : T extends object
        ? T extends infer O
          ? { [K in keyof O]: O[K] }
          : never
        : T;
export type Expand2<T> = T extends Date
  ? T
  : // TODO: [TYPE] handle case where array also has properties
    T extends Array<infer E>
    ? Array<Expand<E>>
    : // TODO: [TYPE] handle case where function also has properties
      T extends Function
      ? T
      : T extends object
        ? T extends infer O
          ? { [K in keyof O]: Expand<O[K]> }
          : never
        : T;
export type Expand3<T> = T extends Date
  ? T
  : // TODO: [TYPE] handle case where array also has properties
    T extends Array<infer E>
    ? Array<Expand2<E>>
    : // TODO: [TYPE] handle case where function also has properties
      T extends Function
      ? T
      : T extends object
        ? T extends infer O
          ? { [K in keyof O]: Expand2<O[K]> }
          : never
        : T;

// expands object types recursively
export type ExpandRecursively<T> = T extends Date
  ? T
  : // TODO: [TYPE] handle case where array also has properties
    T extends Array<infer E>
    ? Array<ExpandRecursively<E>>
    : // TODO: [TYPE] handle case where function also has properties
      T extends Function
      ? T
      : T extends object
        ? T extends infer O
          ? { [K in keyof O]: ExpandRecursively<O[K]> }
          : never
        : T;
export type Await<T> = T extends {
  then(onfulfilled?: (value: infer U) => unknown): unknown;
}
  ? U
  : T;

export type UnwrapArrayElement<T extends Array<unknown>> = T extends Array<
  infer U
>
  ? U
  : undefined;

export type UnwrapPaginationItem<T extends Pagination<unknown>> =
  T extends Pagination<infer U> ? U : undefined;

export type WithRequired<T extends object, K extends keyof T> = Omit<T, K> & {
  [P in K]-?: T[P];
};

export type WithOptional<T extends object, K extends keyof T> = Omit<T, K> & {
  [P in K]?: T[P];
};

export type OptionalPropertyOf<T extends object> = Exclude<
  {
    [K in keyof T]: T extends Record<K, T[K]> ? never : K;
  }[keyof T],
  undefined
>;

export type RequiredPropertyOf<T extends object> = Exclude<
  {
    [K in keyof T]: T extends Record<K, T[K]> ? K : never;
  }[keyof T],
  undefined
>;

export type RequiredNotNullablePropertyOf<T extends object> = Exclude<
  {
    [K in keyof T]: T extends Record<K, T[K]>
      ? null extends T[K]
        ? never
        : undefined extends T[K]
          ? never
          : K
      : never;
  }[keyof T],
  undefined
>;

export type RequiredNullablePropertyOf<T extends object> = Exclude<
  {
    [K in keyof T]: T extends Record<K, T[K]>
      ? null extends T[K]
        ? K
        : undefined extends T[K]
          ? K
          : never
      : never;
  }[keyof T],
  undefined
>;

export type FunctionPropertyOf<T extends object> = Exclude<
  {
    [K in keyof T]: T[K] extends Function ? K : never;
  }[keyof T],
  undefined
>;

export type ExcludeAllOptional<T extends object> = {
  [K in RequiredPropertyOf<T>]: T[K];
};

export type PickEntity<T extends BaseEntity, K extends keyof T> = Pick<
  T,
  K | keyof BaseEntity
>;

export type PickEntityRequired<
  T extends BaseEntity,
  K extends keyof T,
> = Required<PickEntity<T, K>>;

export type PickEntityOptional<
  T extends BaseEntity,
  K extends keyof T,
> = Partial<PickEntity<T, K>>;

export type EntityBasics<T extends BaseEntity> = ExcludeAllOptional<T> &
  Pick<T, keyof BaseEntity>;

export type PickRequired<T extends object, K extends keyof T> = Required<
  Pick<T, K>
>;

export type PickOptional<T extends object, K extends keyof T> = Partial<
  Pick<T, K>
>;

export type PickNotNullRequired<T extends object, K extends keyof T> = Required<
  PickNotNull<T, K>
>;

export type NotNull<T> = Exclude<T, null>;

export type NotNullDueToAppLogic<T> = NotNull<T>;

export type NotUndefined<T> = Exclude<T, undefined>;

export type NotNullOrUndefined<T> = NonNullable<T>;

export type PickAltered<T extends object, K extends keyof T, A> = {
  [P in K]: A;
};

export type PickNotNull<T extends object, K extends keyof T> = {
  [P in K]: NotNull<T[P]>;
};

export type PickAlteredRequired<
  T extends object,
  K extends keyof T,
  A,
> = Required<PickAltered<T, K, A>>;

export type PickAlteredOptional<
  T extends object,
  K extends keyof T,
  A,
> = Partial<PickAltered<T, K, A>>;

export type WithAltered<T extends object, K extends keyof T, A> = Omit<T, K> & {
  [P in K]: A;
};

export type WithAlteredOptional<T extends object, K extends keyof T, A> = Omit<
  T,
  K
> & {
  [P in K]?: A;
};

export type WithAlteredRequired<T extends object, K extends keyof T, A> = Omit<
  T,
  K
> & {
  [P in K]-?: A;
};

export type WithNotNull<T extends object, K extends keyof T> = Omit<T, K> & {
  [P in K]: NotNull<T[P]>;
};

export type WithNotNullRequired<T extends object, K extends keyof T> = Omit<
  T,
  K
> & {
  [P in K]-?: NotNull<T[P]>;
};

export type InsertEntity<T extends object> = {
  [K in keyof T]: T[K] | (() => string);
};

/**
 * TODO: [TYPE] only make certain types InsertEntity, like Date. Perhaps provide a list of
 * exclusions or inclusions to apply InsertEntity to.
 */
export type InsertDefaults<
  T extends AuditableEntity,
  Defaulted extends keyof T = never,
> = InsertEntity<
  Omit<
    Pick<T, Exclude<RequiredNotNullablePropertyOf<T>, Defaulted>> &
      PickOptional<T, Exclude<RequiredNullablePropertyOf<T>, Defaulted>> &
      PickOptional<T, Defaulted>,
    keyof AuditableEntity | 'id' | FunctionPropertyOf<T>
  >
>;

export type KeyOf<T extends object, K extends keyof T> = K;

export type OmitProps<T extends object, K extends keyof T> = Omit<T, K>;

export type OmitFunctionProps<T extends object> = OmitProps<
  T,
  FunctionPropertyOf<T>
>;

export type Optional<T> = T | undefined;

export type Nullable<T> = T | null;

export type NullIfDeleted<T> = Nullable<T>;

export type PickAsNullIfDeleted<
  T extends object,
  K extends keyof T,
> = PickAltered<T, K, NullIfDeleted<T[K]>>;

export type PickAsNullIfDeletedRequired<
  T extends object,
  K extends keyof T,
> = PickAlteredRequired<T, K, NullIfDeleted<T[K]>>;

export type PickAsNullIfDeletedOptional<
  T extends object,
  K extends keyof T,
> = PickAlteredOptional<T, K, NullIfDeleted<T[K]>>;

export type WithAsNullIfDeleted<T extends object, K extends keyof T> = Omit<
  T,
  K
> &
  PickAsNullIfDeleted<T, K>;

export type WithAsNullIfDeletedRequired<
  T extends object,
  K extends keyof T,
> = Omit<T, K> & PickAsNullIfDeletedRequired<T, K>;

export type WithAsNullIfDeletedOptional<
  T extends object,
  K extends keyof T,
> = Omit<T, K> & PickAsNullIfDeletedOptional<T, K>;

/**
 * A convenient way to cast safely.
 */
export function asType<T>(t: T) {
  return t;
}

/**
 * NOTE: I don't get why this works in some cases where asType<DeepPartial<T>>(t) does not.
 */
export function asDeepPartial<T>(t: T) {
  return asType<DeepPartial<T>>(t);
}

export function asQueryDeepPartialEntity<T>(t: T) {
  return asType<QueryDeepPartialEntity<T>>(t);
}

/**
 * Safely access an array by index. Returns undefined if the item does not exist.
 */
export function itemAtIndex<T>(index: number, array: T[]): T | undefined;
export function itemAtIndex<T>(
  index: number,
  array: T[],
  assertExists: false,
): T | undefined;
export function itemAtIndex<T>(
  index: number,
  array: T[],
  assertExists: true,
): T;
export function itemAtIndex<T>(
  index: number,
  array: T[],
  assertExists?: boolean,
) {
  if (assertExists) {
    if (index < 0 || index > array.length) {
      throw new Error('index is out of array bounds');
    }
  }
  const value = array[index];
  if (assertExists) {
    return value as T;
  }

  return value as T | undefined;
}

export function firstItem<T>(array: T[]): T | undefined;
export function firstItem<T>(array: T[], assertExists: false): T | undefined;
export function firstItem<T>(array: T[], assertExists: true): T;
export function firstItem<T>(
  array: T[],
  assertExists?: boolean,
): T | undefined {
  const index = 0;
  if (assertExists) {
    return itemAtIndex(index, array, assertExists);
  }
  return itemAtIndex(index, array);
}

export function lastItem<T>(array: T[]): T | undefined;
export function lastItem<T>(array: T[], assertExists: false): T | undefined;
export function lastItem<T>(array: T[], assertExists: true): T;
export function lastItem<T>(array: T[], assertExists?: boolean): T | undefined {
  const index = array.length - 1;
  if (assertExists) {
    return itemAtIndex(index, array, assertExists);
  }
  return itemAtIndex(index, array);
}

export function assertTruthy(arg: any): asserts arg {
  if (!arg) {
    throw new Error('Expected truthy');
  }
  return arg;
}

export function assertNotNull<T>(arg: T): asserts arg is Exclude<T, null> {
  if (arg === null) {
    throw new Error('Expected not null');
  }
}

export function assertNotUndefined<T>(
  arg: T,
): asserts arg is Exclude<T, undefined> {
  if (arg === undefined) {
    throw new Error('Expected not undefined');
  }
}

export function assertNotNullAndNotUndefined<T>(
  arg: T,
): asserts arg is Exclude<T, null | undefined> {
  assertNotNull(arg);
  assertNotUndefined(arg);
}
