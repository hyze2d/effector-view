import type { Event, Store } from 'effector';
import type { ComponentType } from 'react';
import { memo, useEffect } from 'react';
import type {
  AnyRecord,
  BuilderConfig,
  EffectorDependencies,
  Fn
} from './types';
import React from 'react';
import { pickFieldsBy } from './lib';

const createBuilder = (
  deps: EffectorDependencies,

  view?: ComponentType<any>
) => {
  const config: BuilderConfig = {};

  const order: (keyof BuilderConfig)[] = [];

  const createCollector =
    (
      key: keyof BuilderConfig,

      collect = (value: unknown) => {
        config[key] = value as any;
      }
    ) =>
    (value: unknown) => {
      collect(value);

      delete builder[key];

      if (key == 'map' || key == 'static' || key == 'units') {
        order.push(key);
      }

      return builder;
    };

  const builder = {
    units: createCollector('units'),

    map: createCollector('map'),

    effect: createCollector('effect'),

    static: createCollector('static'),

    open: createCollector('open'),

    close: createCollector('close'),

    // select: createCollector('select'),

    memo: createCollector('memo', value => {
      config.memo = typeof value == 'function' ? (value as Fn) : true;
    }),

    defaultProps: createCollector('defaultProps'),

    displayName: createCollector('displayName'),

    view: (render: ComponentType<any>) => {
      const Base = view ?? render;

      const useLifecycle = (payload: Record<string, any>) => {
        if (!config.open && !config.close) {
          return;
        }

        const onMount =
          deps.is.event(config.open) || deps.is.effect(config.open)
            ? (deps.useUnit! ?? deps.useEvent!)(config.open as Event<void>)
            : config.open;

        const onCleanup =
          deps.is.event(config.close) || deps.is.effect(config.close)
            ? (deps.useUnit! ?? deps.useEvent)(config.close as Event<void>)
            : config.close;

        useEffect(() => {
          onMount?.(payload);

          if (config.close) {
            return () => {
              onCleanup?.(payload);
            };
          }
        }, []);
      };

      const stores = config.units
        ? pickFieldsBy(config.units as AnyRecord, value => deps.is.store(value))
        : {};

      const events = config.units
        ? pickFieldsBy(
            config.units as AnyRecord,
            value => deps.is.event(value) || deps.is.effect(value)
          )
        : {};

      const $store =
        deps.useUnit ?? Object.keys(stores).length == 0
          ? null
          : deps.combine!(stores);

      const hasEvents = Object.keys(events).length != 0;

      // eslint-disable-next-line
      const getUnits = deps.useUnit
        ? config.units
          ? () => deps.useUnit!(config.units as AnyRecord)
          : () => ({})
        : () => ({
            ...($store ? deps.useStore!($store as Store<any>) : {}),

            ...(hasEvents
              ? deps.useEvent!(events as Record<string, Event<any>>)
              : {})
          });

      const View = (props: Record<string, any>) => {
        let _props = props;

        order.forEach(key => {
          // eslint-disable-next-line
          switch (key) {
            case 'map': {
              _props = {
                ..._props,

                ...config.map!(_props)
              };

              break;
            }

            case 'static': {
              _props = {
                ..._props,

                ...config.static
              };

              break;
            }

            case 'units': {
              _props = {
                ..._props,

                ...getUnits()
              };

              break;
            }
          }
        });

        useLifecycle(_props);

        config.effect?.(_props);

        return <Base {..._props} />;
      };

      View.defaultProps = config.defaultProps ?? {};

      if (config.units) {
        View.units = config.units;
      }

      if (config.map) {
        View.map = config.map;
      }

      if (config.effect) {
        View.effect = config.effect;
      }

      if (config.static) {
        View.static = config.static;
      }

      if (config.memo) {
        View.Memo = memo(
          View,

          typeof config.memo == 'function' ? config.memo : undefined
        );
      }

      if (config.displayName) {
        View.displayName = config.displayName;
      }

      if (config.open) {
        View.open = config.open;
      }

      if (config.close) {
        View.close = config.close;
      }

      return View;
    }
  };

  return builder;
};

export { createBuilder };
