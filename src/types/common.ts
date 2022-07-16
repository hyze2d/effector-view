import type { Store, StoreValue, Effect, is, Event } from 'effector';
import type { useUnit, useStoreMap } from 'effector-react';
import type { ReactElement } from 'react';

type MapUnits<
  T extends {
    [K in keyof T]: T[K] | Store<T[K]>;
  }
> = {
  [P in keyof T]: T[P] extends Store<any>
    ? StoreValue<T[P]>
    : T[P] extends
        | Event<any>
        | Event<void>
        | Effect<any, any, any>
        | Effect<void, any, any>
    ? (payload: Parameters<T[P]>[0]) => ReturnType<T[P]>
    : T[P];
};

type EffectorDependencies = {
  useUnit: typeof useUnit;

  useStoreMap: typeof useStoreMap;

  is: typeof is;
};

type Fn = (...args: any[]) => any;

type ComponentFn<Props> = (props: Props) => ReactElement<any, any> | null;

type AnyRecord = Record<string, any>;

export type { MapUnits, Fn, EffectorDependencies, ComponentFn, AnyRecord };
