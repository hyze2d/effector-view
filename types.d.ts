import type { Event, Store } from 'effector';
import type { useEvent, useStore } from 'effector-react';
import type { MemoExoticComponent } from 'react';
declare type EffectorHooks = {
    useStore: typeof useStore;
    useEvent: typeof useEvent;
};
declare type MapStoresToValues<T extends {
    [K in keyof T]: T[K] | Store<T[K]>;
}> = {
    [P in keyof T]: T[P] extends Store<any> ? ReturnType<T[P]['getState']> : T[P] extends Event<any> ? (payload: Parameters<T[P]>[0]) => void : T[P];
};
declare type BuilderResult<P, MP, K extends string> = Omit<ViewBuilder<P, MP, K>, K>;
declare type ConnectorBuilderResult<P, MP, K extends string> = Omit<ViewConnectorBuilder<P, MP, K>, K>;
declare type View<P, MP> = ((props: Omit<P, keyof MP>) => JSX.Element | null) & {
    defaultProps?: Partial<P>;
    displayName?: string;
    Memo: MemoExoticComponent<(props: Omit<P, keyof MP>) => JSX.Element | null>;
    Original: (props: Omit<P, keyof MP> & MP) => JSX.Element | null;
};
declare type BaseBuilder<P, MP, K extends string> = {
    displayName: (displayName: string) => BuilderResult<P, MP, K | 'displayName'>;
    defaultProps: (defaultProps: Partial<P>) => BuilderResult<P, MP, K | 'defaultProps'>;
    enter: (event: Event<void> | Event<void>) => BuilderResult<P, MP, K | 'enter'>;
    exit: (event: Event<void> | Event<void>) => BuilderResult<P, MP, K | 'exit'>;
    effect: (effect: (props: P & MP) => void) => BuilderResult<P, MP, K | 'effect'>;
};
declare type ViewBuilder<P, MP, K extends string> = BaseBuilder<P, MP, K> & {
    props: <T extends Record<string, any>>(props: T) => BuilderResult<P, MP & MapStoresToValues<T>, K | 'props'>;
    map: <T extends Record<string, unknown>>(map: (props: P & MP) => T) => BuilderResult<P, MP & T, K | 'map'>;
    view: (render: (props: Omit<P, keyof MP> & MP) => JSX.Element | null) => View<P, MP>;
};
declare type ViewConnectorBuilder<P, MP, K extends string> = BaseBuilder<P, MP, K> & {
    props: <T extends Partial<{
        [F in keyof P]: P[F] | Store<P[F]>;
    }>>(props: T) => ConnectorBuilderResult<P, MP & MapStoresToValues<T>, K | 'props'>;
    map: <T extends Partial<P>>(map: (props: P & MP) => T) => ConnectorBuilderResult<P, MP & T, K | 'map'>;
    view: () => View<P, MP>;
};
declare type BaseConfig<P, MP> = {
    defaultProps?: Partial<P>;
    displayName?: string;
    enter?: Event<void>;
    exit?: Event<void>;
    effect?: (props: P & MP) => void;
    props: any;
    map: any;
};
declare type Config<P, MP> = BaseConfig<P, MP> & {
    props?: Record<string, unknown>;
    map?: (props: P & MP) => Record<string, unknown>;
};
export type { View, Config, BaseConfig, BaseBuilder, ViewBuilder, EffectorHooks, BuilderResult, MapStoresToValues, ViewConnectorBuilder };
