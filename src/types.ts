import type { useEvent, useStore, useStoreMap } from 'effector-react';

import type {
  combine,
  is,
  Store,
  Unit,
  StoreValue,
  Event,
  Effect
} from 'effector';
import type { ComponentType, MemoExoticComponent } from 'react';

type EffectorDependencies = {
  useEvent: typeof useEvent;

  useStore: typeof useStore;

  useStoreMap: typeof useStoreMap;

  combine: typeof combine;

  is: typeof is;
};

type UnitsToValues<
  U extends {
    [x: string]: Unit<any>;
  }
> = {
  [P in keyof U]: U[P] extends Store<any>
    ? StoreValue<U[P]>
    : U[P] extends Effect<any, any> | Event<any>
    ? (payload: Parameters<U[P]>[0]) => ReturnType<U[P]>
    : unknown;
};

type SelectorConfig<S, P, R, K> = {
  store: Store<S>;

  keys: (props: P) => K;

  fn: (state: S, keys: K) => R;
};

type BuilderConfig = {
  units?: Record<string, Unit<any>>;

  map?: <T>(props: Record<string, any>) => T;

  effect?: (props: Record<string, any>) => void;

  static?: Record<string, any>;

  open?: (...args: any[]) => void | Promise<any>;

  close?: (...args: any[]) => void | Promise<any>;

  select?: Record<string, SelectorConfig<any, any, any, any>>;

  memo?: boolean;

  defaultProps?: Record<string, any>;

  displayName?: string;
};

type View<
  Props,
  Units extends Record<string, Unit<any>>,
  Map,
  Static,
  Select extends Record<string, SelectorConfig<any, any, any, any>>,
  Open extends (props: any) => void,
  Close extends (props: any) => void,
  DepKeys extends string = ''
> = ComponentType<Props> & {
  map: Map;

  units: Units;

  effect: () => void;

  static: Static;

  open: Open;

  close: Close;

  select: Select;

  displayName: string;

  Memo: MemoExoticComponent<ComponentType<Props>>;

  View: ComponentType<Omit<Props, DepKeys>>;
};

type BaseBuilder<
  Props,
  Units extends Record<string, Unit<any>>,
  Map,
  Static,
  Select extends Record<string, SelectorConfig<any, any, any, any>>,
  Open extends (props: any) => void,
  Close extends (props: any) => void,
  DepKeys extends string = ''
> = {
  units: <U extends Record<string, Unit<any>>>(
    units: U
  ) => BaseBuilder<Props, U, Map, Static, Select, Open, Close, DepKeys>;

  map: (
    selector: <T>(props: Props & Static & UnitsToValues<Units>) => T
  ) => void;

  static?: Record<string, any>;

  select?: Record<string, SelectorConfig<any, any, any, any>>;

  effect: (effect: (props: Record<string, any>) => void) => void;

  open?: (...args: any[]) => void | Promise<any>;

  close?: (...args: any[]) => void | Promise<any>;

  memo?: boolean;

  defaultProps?: Record<string, any>;

  displayName?: string;
};

export type { EffectorDependencies, BuilderConfig };
