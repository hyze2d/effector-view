import type { Unit } from 'effector';
import type { AnyRecord, ComponentFn, Fn, MapUnits } from './common';
import type { FactoryView } from './view';

type Factory<
  Props extends AnyRecord | null,
  Units extends AnyRecord | null,
  Static extends AnyRecord | null,
  Map extends Fn | null,
  ViewEffect extends Fn | null,
  Open extends Fn | null,
  Close extends Fn | null,
  DefaultProps extends Partial<Props> | null,
  ShouldUpdate extends Fn | null,
  DepKeys extends string,
  UsedKeys extends string = '',
  FullProps = (Props extends AnyRecord ? Props : {}) &
    (Static extends AnyRecord ? Static : {}) &
    (Units extends AnyRecord ? MapUnits<Units> : {}) &
    (Map extends Fn ? ReturnType<Map> : {}),
  ImpossibleNewProps = Partial<Record<keyof FullProps, never>>
> = Omit<
  {
    units: <T extends Record<string, Unit<any>> & ImpossibleNewProps>(
      units: T
    ) => Factory<
      Props,
      T,
      Static,
      Map,
      ViewEffect,
      Open,
      Close,
      DefaultProps,
      ShouldUpdate,
      DepKeys,
      UsedKeys | 'units'
    >;

    static: <T extends AnyRecord & ImpossibleNewProps>(
      props: T
    ) => Factory<
      Props,
      Units,
      T,
      Map,
      ViewEffect,
      Open,
      Close,
      DefaultProps,
      ShouldUpdate,
      DepKeys,
      UsedKeys | 'static'
    >;

    map: <T extends AnyRecord & ImpossibleNewProps>(
      map: (props: Props & Static & MapUnits<Units>) => T
    ) => Factory<
      Props,
      Units,
      Static,
      typeof map,
      ViewEffect,
      Open,
      Close,
      DefaultProps,
      ShouldUpdate,
      DepKeys,
      UsedKeys | 'map'
    >;

    effect: (
      effect: (props: FullProps) => void
    ) => Factory<
      Props,
      Units,
      Static,
      Map,
      typeof effect,
      Open,
      Close,
      DefaultProps,
      ShouldUpdate,
      DepKeys,
      UsedKeys | 'effect'
    >;

    open: (
      open: ((props: FullProps) => any) | (() => any)
    ) => Factory<
      Props,
      Units,
      Static,
      Map,
      ViewEffect,
      typeof open,
      Close,
      DefaultProps,
      ShouldUpdate,
      DepKeys,
      UsedKeys | 'open'
    >;

    close: (
      close: ((props: FullProps) => any) | (() => any)
    ) => Factory<
      Props,
      Units,
      Static,
      Map,
      ViewEffect,
      Open,
      typeof close,
      DefaultProps,
      ShouldUpdate,
      DepKeys,
      UsedKeys | 'close'
    >;

    defaultProps: <T extends Partial<Props>>(
      props: T
    ) => Factory<
      Props,
      Units,
      Static,
      Map,
      ViewEffect,
      Open,
      Close,
      T,
      ShouldUpdate,
      DepKeys,
      UsedKeys | 'defaultProps'
    >;

    memo: (
      shouldUpdate?: (a: FullProps, b: FullProps) => boolean
    ) => Factory<
      Props,
      Units,
      Static,
      Map,
      ViewEffect,
      Open,
      Close,
      DefaultProps,
      typeof shouldUpdate extends Fn ? typeof shouldUpdate : null,
      DepKeys,
      UsedKeys | 'memo'
    >;

    displayName: (
      displayName: string
    ) => Factory<
      Props,
      Units,
      Static,
      Map,
      ViewEffect,
      Open,
      Close,
      DefaultProps,
      ShouldUpdate,
      DepKeys,
      UsedKeys | 'displayName'
    >;

    view: (
      view: ComponentFn<FullProps>
    ) => FactoryView<
      Props,
      Units,
      Static,
      Map,
      ViewEffect,
      Open,
      Close,
      DefaultProps,
      ShouldUpdate,
      DepKeys
    >;
  },
  UsedKeys
>;

export type { Factory };
