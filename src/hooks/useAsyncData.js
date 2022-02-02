import { useEffect, useState } from 'react';

/**
 * Abstract async data resolver
 * @param resolver
 * @param deps
 * @returns {[boolean,unknown,unknown]}
 */
export default function useAsyncData(resolver, deps = []) {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(undefined);
  const [result, setResult] = useState(undefined);

  useEffect(() => {
    (async () => {
      setLoading(true);

      try {
        setResult(await resolver());
        setError(undefined);
      } catch (effectError) {
        setError(effectError);
        setResult(undefined);
      } finally {
        setLoading(false);
      }
    })();
  }, deps);

  return [loading, result, error];
}
