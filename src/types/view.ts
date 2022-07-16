import type { ComponentType, MemoExoticComponent } from 'react';
import type { ComponentFn, Fn, MapUnits } from './common';

type BaseView<
  Units,
  Static,
  Map,
  ViewEffect,
  Open,
  Close,
  DefaultProps,
  ShouldUpdate
> = {
  units: Units;

  static: Static;

  map: Map;

  effect: ViewEffect;

  open: Open;

  close: Close;

  defaultProps: DefaultProps;

  shouldUpdate: ShouldUpdate;
};

type FactoryView<
  Props,
  Units,
  Static,
  Map extends Fn | null,
  ViewEffect,
  Open,
  Close,
  DefaultProps,
  ShouldUpdate,
  DepKeys extends keyof Props
> = BaseView<
  Units,
  Static,
  Map,
  ViewEffect,
  Open,
  Close,
  DefaultProps,
  ShouldUpdate
> & {
  View: ComponentFn<
    Omit<Props, DepKeys> &
      Static &
      MapUnits<Units> &
      (Map extends Fn ? ReturnType<Map> : {})
  >;

  Memo: MemoExoticComponent<ComponentType<Omit<Props, DepKeys>>>;
} & ComponentFn<Omit<Props, DepKeys>>;

type DecoratedView<
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
  ProvidedKeys extends string = ''
> = BaseView<
  Units,
  Static,
  Map,
  ViewEffect,
  Open,
  Close,
  DefaultProps,
  ShouldUpdate
> & {
  View: Source;

  Memo: MemoExoticComponent<ComponentType<Omit<Props, ProvidedKeys>>>;
} & ComponentFn<Omit<Props, ProvidedKeys>>;

export type { DecoratedView, FactoryView };
