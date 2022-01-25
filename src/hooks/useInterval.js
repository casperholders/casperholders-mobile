import { useEffect, useRef } from 'react';

export default function useInterval(callback, delay) {
  const callbackRef = useRef();
  const clearIntervalRef = useRef();

  useEffect(() => {
    callbackRef.current = callback;
  }, [callback]);

  useEffect(() => {
    const intervalId = setInterval(() => {
      callbackRef.current();
    }, delay);

    clearIntervalRef.current = () => {
      clearInterval(intervalId);
    };

    return () => {
      clearInterval(intervalId);
    };
  }, []);

  return clearIntervalRef.current;
}
