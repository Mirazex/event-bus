import {IEventBus} from "./types";

const events: IEventBus['events'] = new Map();

const subscribe: IEventBus['subscribe'] = (event, callback) => {
  if (!events.has(event)) {
    const newSet = new Set<Function>();
    events.set(event, newSet);
  }

  const callbacks = events.get(event);
  callbacks?.add(callback);

  const remove = () => {
    callbacks?.delete(callback);

    if (!callbacks?.size) {
      events.get(event)?.delete(callback);
    }
  }

  return {
    remove
  }
}

const send: IEventBus['send'] = (event, args) => {
  if (!events.has(event)) {
    return;
  }

  const callbacks = events.get(event);

  if (!callbacks?.size) {
    return
  }

  console.log("[EVENT_BUS]:", event)
  console.log("[EVENT_BUS]:", { callbacks: callbacks.size, payload: args })

  for (const callback of callbacks) {
    callback(args);
  }
}

export const Bus: IEventBus = {
  events,
  subscribe,
  send
}
