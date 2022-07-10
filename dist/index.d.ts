import * as effector from 'effector';
import * as react from 'react';
import { EffectorDependencies } from './types.ts';

declare const createLib: (deps: EffectorDependencies) => {
    createView: (view: any) => {
        units: (value: unknown) => any;
        map: (value: unknown) => any;
        effect: (value: unknown) => any;
        static: (value: unknown) => any;
        open: (value: unknown) => any;
        close: (value: unknown) => any;
        select: (value: unknown) => any;
        memo: (value: unknown) => any;
        defaultProps: (value: unknown) => any;
        displayName: (value: unknown) => any;
        view: (render: react.ComponentType<any>) => {
            (props: Record<string, any>): JSX.Element;
            units: Record<string, effector.Unit<any>>;
            map: <T>(props: Record<string, any>) => T;
            effect: (props: Record<string, any>) => void;
            static: Record<string, any>;
            defaultProps: Record<string, any>;
            Memo: react.MemoExoticComponent<any>;
            displayName: string;
            open: (...args: any[]) => void | Promise<any>;
            close: (...args: any[]) => void | Promise<any>;
            select: Record<string, {
                store: effector.Store<any>;
                keys: (props: any) => any;
                fn: (state: any, keys: any) => any;
            }>;
        };
    };
};

export { createLib };
