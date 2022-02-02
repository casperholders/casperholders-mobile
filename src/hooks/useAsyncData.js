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
    let destroyed = false;
    const onlyIfMounted = (callback) => {
      if (!destroyed) {
        callback();
      }
    };

    (async () => {
      setLoading(true);

      try {
        const result = await resolver();
        onlyIfMounted(() => {
          setResult(result);
          setError(undefined);
        });
      } catch (effectError) {
        onlyIfMounted(() => {
          setError(effectError);
          setResult(undefined);
        });
      } finally {
        onlyIfMounted(() => {
          setLoading(false);
        });
      }
    })();

    return () => {
      destroyed = true;
    };
  }, deps);

  return [loading, result, error];
}
