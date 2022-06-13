import { createLib } from './create-view';
import * as effectorReact from 'effector-react';

const { createView } = createLib(effectorReact);

export { createView };
export type { MapStoresToValues } from './types';
