import {EventType} from "./events";

export interface IEventBus {
    events: Map<keyof typeof EventType, Set<Function>>;
    subscribe<T>(event: keyof typeof EventType, callback: (payload: T) => void): SubscribeReturn;
    send<T>(event: keyof typeof EventType, payload?: T): void;
}

type SubscribeReturn = {
    remove(): void
}