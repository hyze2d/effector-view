import type { useEvent, useStore, useStoreMap } from 'effector-react';

import type { combine, is, Store, Unit } from 'effector';

type EffectorDependencies = {
  useEvent: typeof useEvent;

  useStore: typeof useStore;

  useStoreMap: typeof useStoreMap;

  combine: typeof combine;

  is: typeof is;
};

type SelectorConfig<S, P, R, K> = {
  store: Store<S>;

  keys: (props: P) => K;

  fn: (state: S, keys: K) => R;
};

type BuilderConfig = {
  units?: Record<string, Unit<any>>;

  map?: <T>(props: Record<string, any>) => T;

  effect?: (props: Record<string, any>) => void;

  static?: Record<string, any>;

  open?: (...args: any[]) => void | Promise<any>;

  close?: (...args: any[]) => void | Promise<any>;

  select?: Record<string, SelectorConfig<any, any, any, any>>;

  memo?: boolean;

  defaultProps?: Record<string, any>;

  displayName?: string;
};

type BuilderResult<ExternalProps, DepKeys, MappedProps, OmittedBuilderKeys> =
  {};

export type { EffectorDependencies, BuilderConfig, BuilderResult };
