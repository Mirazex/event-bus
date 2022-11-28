import {EventType} from "./events";
import {Bus} from "./bus";

export function getEvent<T>(name: keyof typeof EventType) {
  return {
    send(payload?: T): void {
      Bus.send(name, payload);
    },
    subscribe(callback: (payload?: T) => void) {
      return Bus.subscribe(name, callback);
    }
  }
}
