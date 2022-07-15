import type { useUnit, useStoreMap } from 'effector-react';

import type { is, Store, Unit, StoreValue, Event, Effect } from 'effector';
import { createStore, createEvent } from 'effector';
import type { ReactNode } from 'react';
import { createElement } from 'react';

type EffectorDependencies = {
  useUnit: typeof useUnit;

  useStoreMap: typeof useStoreMap;

  is: typeof is;
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

type View<
  Props,
  Units,
  Static,
  Map,
  Select,
  ViewEffect,
  Open,
  Close,
  DefaultProps
> = ((props: Props) => JSX.Element) & {
  units: Units;
  static: Static;
  map: Map;
  select: Select;
  effect: ViewEffect;
  open: Open;
  close: Close;
  defaultProps: DefaultProps;
};

type BaseBuilder<
  Props,
  Units extends Record<string, Unit<any>>,
  Static,
  Map,
  MapResult,
  Select extends Record<string, SelectorConfig<any, any, any, any>>,
  ViewEffect,
  Open extends ((props: any) => void) | null,
  Close extends ((props: any) => void) | null,
  DefaultProps extends Partial<Props>,
  DepKeys extends string = '',
  UsedKeys extends string = ''
> = Omit<
  {
    units: <T extends Record<string, Unit<any>>>(
      props: T
    ) => BaseBuilder<
      Props,
      T,
      Static,
      Map,
      MapResult,
      Select,
      ViewEffect,
      Open,
      Close,
      DefaultProps,
      DepKeys,
      UsedKeys | 'units'
    >;

    static: <T>(
      props: T
    ) => BaseBuilder<
      Props,
      Units,
      T,
      Map,
      MapResult,
      Select,
      ViewEffect,
      Open,
      Close,
      DefaultProps,
      DepKeys,
      UsedKeys | 'static'
    >;

    defaultProps: <T extends Partial<Props>>(
      props: T
    ) => BaseBuilder<
      Props,
      Units,
      Static,
      Map,
      MapResult,
      Select,
      ViewEffect,
      Open,
      Close,
      T,
      DepKeys,
      UsedKeys | 'defaultProps'
    >;

    map: <T>(
      map: (
        props: MapUnits<Units> &
          Static &
          Omit<Props, keyof (MapUnits<Units> & Static)>
      ) => T
    ) => BaseBuilder<
      Props,
      Units,
      Static,
      Map,
      T,
      Select,
      ViewEffect,
      Open,
      Close,
      DefaultProps,
      DepKeys,
      UsedKeys | 'map'
    >;

    open: <
      T extends Omit<Props, keyof (MapUnits<Units> & Static & MapResult)> &
        MapUnits<Units> &
        Static &
        MapResult
    >(
      open: (props: T) => void
    ) => BaseBuilder<
      Props,
      Units,
      Static,
      Map,
      MapResult,
      Select,
      ViewEffect,
      typeof open,
      Close,
      DefaultProps,
      DepKeys,
      UsedKeys | 'open'
    >;

    close: <
      T extends Omit<Props, keyof (MapUnits<Units> & Static & MapResult)> &
        MapUnits<Units> &
        Static &
        MapResult
    >(
      close: (props: T) => void
    ) => BaseBuilder<
      Props,
      Units,
      Static,
      Map,
      MapResult,
      Select,
      ViewEffect,
      Open,
      typeof close,
      DefaultProps,
      DepKeys,
      UsedKeys | 'close'
    >;

    effect: (
      effect: (
        props: Omit<Props, keyof (MapUnits<Units> & Static & MapResult)> &
          MapUnits<Units> &
          Static &
          MapResult
      ) => void
    ) => BaseBuilder<
      Props,
      Units,
      Static,
      Map,
      MapResult,
      Select,
      typeof effect,
      Open,
      Close,
      DefaultProps,
      DepKeys,
      UsedKeys | 'effect'
    >;

    memo: <T extends Props>(
      compare?: (a: T, b: T) => boolean
    ) => BaseBuilder<
      Props,
      Units,
      Static,
      Map,
      MapResult,
      Select,
      ViewEffect,
      Open,
      Close,
      DefaultProps,
      DepKeys,
      UsedKeys | 'memo'
    >;

    displayName: (
      displayName: string
    ) => BaseBuilder<
      Props,
      Units,
      Static,
      Map,
      MapResult,
      Select,
      ViewEffect,
      Open,
      Close,
      DefaultProps,
      DepKeys,
      UsedKeys | 'displayName'
    >;

    view: (
      view: (
        props: Omit<Props, keyof (MapUnits<Units> & Static & MapResult)> &
          MapUnits<Units> &
          Static &
          MapResult
      ) => ReactNode | JSX.Element | JSX.Element[] | null
    ) => View<
      Props,
      Units,
      Static,
      Map,
      Select,
      ViewEffect,
      Open,
      Close,
      DefaultProps
    >;
  },
  UsedKeys
>;

const units = {
  bip: createStore(1),
  bop: createStore('dsad'),
  onBla: createEvent<string>()
};

let builder: BaseBuilder<
  { id: number; title: string; kek: string; cheburek: boolean },
  {},
  {},
  {},
  {},
  {},
  null,
  null,
  null,
  {}
>;

const $disabled = createStore(['123', '321', '32131']);

const Test = builder
  .units(units)
  .static({ kek: 123 })
  .defaultProps({ title: 'dsad' })
  .map(props => {
    props.onBla('dsa');

    return {
      sheesh: 'dsada'
    };
  })
  .effect(props => {})
  .view(props => createElement('kek', {}));

export type { EffectorDependencies, BuilderConfig };
