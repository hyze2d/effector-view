import { createBuilder } from './builder';
import type { EffectorDependencies } from './types';
import type { CreateView } from './types/create-view';

function createLib(deps: EffectorDependencies) {
  const createView: CreateView = ((view?: any) =>
    createBuilder(deps, view)) as any;

  return {
    createView
  };
}

export { createLib };
