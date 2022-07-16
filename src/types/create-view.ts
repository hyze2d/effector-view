import type { ComponentType } from 'react';
import type { Decorator } from './decorator';
import type { Factory } from './factory';

type CreateView = {
  <Props, DepKeys extends keyof Props>(): Factory<
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

  <Props>(view: ComponentType<Props>): Decorator<
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
};

export type { CreateView };
