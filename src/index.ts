import { createBuilder } from './builder';
import type { EffectorDependencies } from './types';
import type { Connect, CreateView } from './types/create-view';

function createLib(deps: EffectorDependencies) {
  const connect: Connect = () => createBuilder(deps) as any;

  const createView: CreateView = (() => createBuilder(deps)) as any;

  return {
    connect,
    createView
  };
}

export { createLib };
