import type { Effect, Event, Store } from 'effector';
import { is } from 'effector';

function splitPropsByType(props: Record<string, unknown> = {}) {
  const events: Record<string, Effect<unknown, unknown> | Event<unknown>> = {};
  const stores: Record<string, Store<unknown>> = {};
  const rest: Record<string, unknown> = {};

  for (const [key, value] of Object.entries(props)) {
    if (is.store(value)) {
      stores[key] = value;

      continue;
    }

    if (is.event(value) || is.effect(value)) {
      events[key] = value;

      continue;
    }

    rest[key] = value;
  }

  return {
    rest,
    events,
    stores,
    hasEvents: Object.keys(events).length > 0,
    hasStores: Object.keys(stores).length > 0
  };
}

export { splitPropsByType };
