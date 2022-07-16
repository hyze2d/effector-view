import type { Unit } from 'effector';
import type { Fn } from './common';

type BuilderConfig = {
  units?: Record<string, Unit<any>>;

  map?: <T>(props: Record<string, any>) => T;

  effect?: (props: Record<string, any>) => void;

  static?: Record<string, any>;

  open?: (...args: any[]) => void | Promise<any>;

  close?: (...args: any[]) => void | Promise<any>;

  memo?: boolean | Fn;

  defaultProps?: Record<string, any>;

  displayName?: string;
};

export type { BuilderConfig };
