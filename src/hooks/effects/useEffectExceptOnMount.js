import { useEffect, useRef } from 'react';

export default function useEffectExceptOnMount(effect, deps) {
  const didMount = useRef(false);

  useEffect(() => {
    if (didMount.current) {
      effect();
    } else {
      didMount.current = true;
    }
  }, deps);
}
