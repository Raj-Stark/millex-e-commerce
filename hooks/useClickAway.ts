import { useRef, useLayoutEffect, useEffect } from "react";

type EventType = MouseEvent | TouchEvent;

export function useClickAway<T extends Element>(
  // eslint-disable-next-line no-unused-vars
  callback: (event: EventType) => void,
) {
  const ref = useRef<T>(null);
  const callbackRef = useRef(callback);

  useLayoutEffect(() => {
    callbackRef.current = callback;
  });

  useEffect(() => {
    const handleEvent = (event: EventType) => {
      const element = ref.current;
      const target = event.target as Node;

      if (element && !element.contains(target)) {
        callbackRef.current(event);
      }
    };

    document.addEventListener("mousedown", handleEvent);
    document.addEventListener("touchstart", handleEvent);

    return () => {
      document.removeEventListener("mousedown", handleEvent);
      document.removeEventListener("touchstart", handleEvent);
    };
  }, []);

  return ref;
}
