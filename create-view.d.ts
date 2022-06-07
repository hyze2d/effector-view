/// <reference types="react" />
import type { EffectorHooks, ViewBuilder, ViewConnectorBuilder } from './types';
declare const createLib: ({ useStore, useEvent }: EffectorHooks) => {
    createView: {
        <P, MP = {}>(): ViewBuilder<P, MP, "">;
        <P_1, MP_1 = {}>(component: (props: P_1) => JSX.Element | null): ViewConnectorBuilder<P_1, MP_1, "">;
    };
};
export { createLib };
