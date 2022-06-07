import { createLib } from './create-view';
import { useEvent, useStore } from 'effector-react/ssr';

const { createView } = createLib({ useEvent, useStore });

export { createView };
export type { MapStoresToValues } from './types';
