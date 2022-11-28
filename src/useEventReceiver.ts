import {EventType} from './events';
import {useCallback, useEffect} from 'react';
import {Bus} from './bus';

export function useEventReceiver<T>(name: keyof typeof EventType, callback: (payload?: T) => void) {
  const subscribe = useCallback((callback: (payload: T) => void) => {
    return Bus.subscribe(name, callback);
  }, []);

  const onMount = useCallback(() => {
    let mount = true;
    let subscriber: any = undefined;

    if (mount) {
      subscriber = subscribe(callback);
    }

    return () => {
      mount = false;
      subscriber?.remove();
    };
  }, [subscribe]);

  useEffect(onMount, []);
}
