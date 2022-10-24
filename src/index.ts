import type { ComponentType } from 'react';
import { createBuilder } from './builder';
import type {
  AnyRecord,
  Decorator,
  EffectorDependencies,
  Factory
} from './types';

function createLib(deps: EffectorDependencies) {
  const connect = <Props>(view: ComponentType<Props>) =>
    createBuilder(deps, view) as any as Decorator<
      Props,
      ComponentType<Props>,
      {},
      {},
      null,
      null,
      null,
      null,
      {},
      null
    >;

  const createView = <Props extends AnyRecord, DepKeys extends string = ''>() =>
    createBuilder(deps) as any as Factory<
      Props,
      {},
      {},
      null,
      null,
      null,
      null,
      {},
      null,
      DepKeys
    >;

  return {
    connect,
    createView
  };
}

export { createLib };
