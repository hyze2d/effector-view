import type { ComponentType } from 'react';
import { createBuilder } from './builder';
import type { Decorator, EffectorDependencies, Factory } from './types';

function createLib(deps: EffectorDependencies) {
  // @ts-expect-error Overloads
  function createView<Props, DepKeys extends keyof Props = ''>(): Factory<
    Props,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    DepKeys
  >;
  function createView<Props>(
    view: ComponentType<Props>
  ): Decorator<Props, typeof view, {}, {}, null, null, null, null, {}, null>;
  function createView(view?: any) {
    return createBuilder(deps, view);
  }

  return {
    createView
  };
}

export { createLib };
