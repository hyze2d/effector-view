/// <reference types="react" />
declare const createView: {
    <P, MP = {}>(): import("./types").ViewBuilder<P, MP, "">;
    <P_1, MP_1 = {}>(component: (props: P_1) => JSX.Element | null): import("./types").ViewConnectorBuilder<P_1, MP_1, "">;
};
export { createView };
export type { MapStoresToValues } from './types';
