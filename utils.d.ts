import type { Effect, Event, Store } from 'effector';
declare function splitPropsByType(props?: Record<string, unknown>): {
    rest: Record<string, unknown>;
    events: Record<string, Effect<unknown, unknown, Error> | Event<unknown>>;
    stores: Record<string, Store<unknown>>;
    hasEvents: boolean;
    hasStores: boolean;
};
export { splitPropsByType };
