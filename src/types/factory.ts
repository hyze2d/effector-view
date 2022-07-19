import type { Unit } from 'effector';
import type { AnyRecord, ComponentFn, Fn, MapUnits } from './common';
import type { FactoryView } from './view';

type Factory<
  Props extends AnyRecord,
  Units extends AnyRecord,
  Static extends AnyRecord,
  Map extends Fn | null,
  ViewEffect extends Fn | null,
  Open extends Fn | null,
  Close extends Fn | null,
  DefaultProps extends Partial<Props> | {},
  ShouldUpdate extends Fn | null,
  DepKeys extends string,
  UsedKeys extends string = '',
  FullProps = (Omit<Props, keyof DefaultProps> & {
    [P in keyof DefaultProps]: Props[P];
  }) &
    Static &
    MapUnits<Units> &
    (Map extends Fn ? ReturnType<Map> : {}),
  BaseProps = Partial<Props>
> = Omit<
  {
    units: <T extends Record<string, Unit<any>> & BaseProps>(
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

    static: <T extends AnyRecord & BaseProps>(
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

    map: <T extends AnyRecord & BaseProps>(
      map: (props: FullProps) => T
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
