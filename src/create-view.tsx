// eslint-disable react-hooks/rules-of-hooks

import type { Store } from 'effector';
import { combine } from 'effector';
import { memo, useEffect } from 'react';
import { createBaseBuilder } from './base';
import type { EffectorHooks, ViewBuilder, ViewConnectorBuilder } from './types';
import { splitPropsByType } from './utils';

const createLib = ({ useStore, useEvent }: EffectorHooks) => {
  // @ts-expect-error bumps
  function createView<P, MP = {}>(): ViewBuilder<P, MP, ''>;
  function createView<P, MP = {}>(
    component: (props: P) => JSX.Element | null
  ): ViewConnectorBuilder<P, MP, ''>;
  function createView(component: any) {
    const config: any = {};

    const builder = {
      ...createBaseBuilder(config),

      view(_render?: any) {
        const render = component || _render;

        const { hasEvents, hasStores, stores, events, rest } = splitPropsByType(
          config.props
        );

        let $store: Store<any>;

        if (hasStores) {
          $store = combine(stores);
        }

        const View = (props: any) => {
          let _props = {
            ...props,
            ...rest,
            ...(hasEvents && useEvent(events)),
            ...(hasStores && useStore($store))
          };

          if (config.map) {
            _props = {
              ...props,
              ..._props,
              ...config.map(_props)
            };
          }

          config.effect?.(_props);

          if (config?.enter || config?.exit) {
            useEffect(() => {
              config.enter?.();

              return config.exit;
            }, []);
          }

          return render(_props);
        };

        if (config.displayName) {
          View.displayName = config.displayName;
        }

        if (config.defaultProps) {
          View.defaultProps = config.defaultProps;
        }

        View.Memo = memo(View);

        return View;
      }
    };

    return builder;
  }

  return {
    createView
  };
};

export { createLib };
