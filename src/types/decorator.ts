import type { Store, Event, Effect } from 'effector';
import type { ComponentType } from 'react';
import type { Fn } from './common';
import type { DecoratedView } from './view';

type Decorator<
  Props,
  Source extends ComponentType<Props>,
  Units,
  Static,
  Map extends Fn | null,
  ViewEffect,
  Open,
  Close,
  DefaultProps,
  ShouldUpdate,
  ProvidedKeys extends string = '',
  UsedKeys extends string = ''
> = Omit<
  {
    units: <
      T extends {
        [K in keyof Omit<Props, ProvidedKeys>]?: Props[K] extends Fn
          ?
              | Effect<Parameters<Props[K]>[0], any, any>
              | Event<Parameters<Props[K]>[0]>
          : Store<Props[K]>;
      }
    >(
      units: T
    ) => Decorator<
      Props,
      Source,
      T,
      Static,
      Map,
      ViewEffect,
      Open,
      Close,
      DefaultProps,
      ShouldUpdate,
      ProvidedKeys | keyof T,
      UsedKeys | 'units'
    >;

    static: <T extends Omit<Partial<Props>, ProvidedKeys>>(
      props: T
    ) => Decorator<
      Props,
      Source,
      Units,
      Static,
      Map,
      ViewEffect,
      Open,
      Close,
      DefaultProps,
      ShouldUpdate,
      ProvidedKeys | keyof T,
      UsedKeys | 'static'
    >;

    map: <T extends Omit<Partial<Props>, ProvidedKeys>>(
      map: (props: Props) => T
    ) => Decorator<
      Props,
      Source,
      Units,
      Static,
      Map,
      ViewEffect,
      Open,
      Close,
      DefaultProps,
      ProvidedKeys | keyof T,
      UsedKeys | 'map'
    >;

    effect: <T extends (props: Props) => void>(
      effect: T
    ) => Decorator<
      Props,
      Source,
      Units,
      Static,
      Map,
      T,
      Open,
      Close,
      DefaultProps,
      ShouldUpdate,
      ProvidedKeys,
      UsedKeys | 'effect'
    >;

    open: <T extends ((props: Props) => any) | (() => any)>(
      open: T
    ) => Decorator<
      Props,
      Source,
      Units,
      Static,
      Map,
      ViewEffect,
      T,
      Close,
      DefaultProps,
      ShouldUpdate,
      ProvidedKeys,
      UsedKeys | 'open'
    >;

    close: <T extends ((props: Props) => any) | (() => any)>(
      close: T
    ) => Decorator<
      Props,
      Source,
      Units,
      Static,
      Map,
      ViewEffect,
      Open,
      T,
      DefaultProps,
      ShouldUpdate,
      ProvidedKeys,
      UsedKeys | 'close'
    >;

    defaultProps: <T extends Partial<Props>>(
      close: T
    ) => Decorator<
      Props,
      Source,
      Units,
      Static,
      Map,
      ViewEffect,
      Open,
      Close,
      T,
      ShouldUpdate,
      ProvidedKeys,
      UsedKeys | 'defaultProps'
    >;

    displayName: (
      name: string
    ) => Decorator<
      Props,
      Source,
      Units,
      Static,
      Map,
      ViewEffect,
      Open,
      Close,
      DefaultProps,
      ShouldUpdate,
      ProvidedKeys,
      UsedKeys | 'displayName'
    >;

    memo: (
      shouldUpdate?: (
        a: Omit<Props, ProvidedKeys>,
        b: Omit<Props, ProvidedKeys>
      ) => boolean
    ) => Decorator<
      Props,
      Source,
      Units,
      Static,
      Map,
      ViewEffect,
      Open,
      Close,
      DefaultProps,
      typeof shouldUpdate,
      ProvidedKeys,
      UsedKeys | 'memo'
    >;

    view: () => DecoratedView<
      Props,
      Source,
      Units,
      Static,
      Map,
      ViewEffect,
      Open,
      Close,
      DefaultProps,
      ShouldUpdate,
      ProvidedKeys
    >;
  },
  UsedKeys
>;

export type { Decorator };
