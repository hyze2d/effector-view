import type { ComponentType } from 'react';
import { createBuilder } from './builder';
import type { BuilderResult, EffectorDependencies } from './types';

const createLib = (deps: EffectorDependencies) => {
  const createView = <P extends Record<string, any>, K extends keyof P = ''>(
    view?: ComponentType<P>
  ) => createBuilder(deps, view as any) as BuilderResult<P, K, {}, ''>;

  return {
    createView
  };
};

export { createLib };
