import type { Event } from 'effector';
import { useEvent } from 'effector-react';
import type { ComponentType } from 'react';
import { memo, useEffect } from 'react';
import { pickFieldsBy } from './lib';
import type { BuilderConfig, EffectorDependencies } from './types';

const empty = {};

const createBuilder = (
  deps: EffectorDependencies,

  view?: ComponentType<any>
) => {
  const config: BuilderConfig = {};

  const order: string[] = [];

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

      if (key == 'map' || key == 'select') {
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

    select: createCollector('select'),

    memo: createCollector('memo', () => {
      config.memo = true;
    }),

    defaultProps: createCollector('defaultProps'),

    displayName: createCollector('displayName'),

    view: (render: ComponentType<any>) => {
      const Base = view ?? render;

      const stores = config.units
        ? pickFieldsBy(config.units, value => deps.is.store(value))
        : {};

      const $store = Object.keys(stores).length ? deps.combine(stores) : null;

      const events = config.units
        ? pickFieldsBy(
            config.units,

            value => deps.is.event(value) || deps.is.effect(value)
          )
        : {};

      const hasStores = Object.keys(stores).length > 0;

      const hasEvents = Object.keys(events).length > 0;

      const useLifecycle = (payload: Record<string, any>) => {
        if (!config.open && !config.close) {
          return;
        }

        const onMount =
          deps.is.event(config.open) || deps.is.effect(config.open)
            ? useEvent(config.open as Event<void>)
            : config.open;

        const onCleanup =
          deps.is.event(config.close) || deps.is.effect(config.close)
            ? useEvent(config.close as Event<void>)
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

      const View = (props: Record<string, any>) => {
        let _props = {
          ...config.defaultProps,

          ...config.static,

          ...props,

          ...(hasStores ? deps.useStore($store!) : empty),

          ...(hasEvents ? deps.useEvent(events) : empty)
        };

        order.forEach(key => {
          switch (key) {
            case 'map': {
              _props = {
                ..._props,

                ...config.map!(_props)
              };

              break;
            }

            case 'select': {
              _props = {
                ..._props,

                ...Object.entries(config.select!).reduce(
                  (result, [key, item]) => ({
                    ...result,

                    [key]: deps.useStoreMap({
                      store: item.store,

                      keys: item.keys(_props),

                      fn: item.fn
                    })
                  }),
                  {}
                )
              };
              break;
            }
          }
        });

        useLifecycle(_props);

        config.effect?.(_props);

        return <Base {..._props} />;
      };

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

      if (config.defaultProps) {
        View.defaultProps = config.defaultProps;
      }

      if (config.memo) {
        View.Memo = memo(View);
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

      if (config.select) {
        View.select = config.select;
      }

      return View;
    }
  };

  return builder;
};

export { createBuilder };
