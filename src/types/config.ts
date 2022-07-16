import type { Unit } from 'effector';

type BuilderConfig = {
  units?: Record<string, Unit<any>>;

  map?: <T>(props: Record<string, any>) => T;

  effect?: (props: Record<string, any>) => void;

  static?: Record<string, any>;

  open?: (...args: any[]) => void | Promise<any>;

  close?: (...args: any[]) => void | Promise<any>;

  memo?: boolean;

  defaultProps?: Record<string, any>;

  displayName?: string;
};

export type { BuilderConfig };
