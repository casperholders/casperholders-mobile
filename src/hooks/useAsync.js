import { useEffect, useState } from 'react';

export default function useAsync(resolver, effectDeps) {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(undefined);
  const [result, setResult] = useState(undefined);

  useEffect(() => {
    async function callResolver() {
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
    }

    callResolver();
  }, effectDeps);

  return [loading, result, error];
}
