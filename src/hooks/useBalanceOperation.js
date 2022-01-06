import { useEffect, useState } from 'react';

export default function (balanceLoading, balance, balanceError, operation, deps = []) {
  const [result, setResult] = useState(undefined);

  useEffect(() => {
    if (balanceLoading || balanceError) {
      setResult(undefined);

      return;
    }

    try {
      setResult(operation(balance, ...deps));
    } catch (_) {
      setResult(undefined);
    }
  }, [balanceLoading, balance, balanceError, ...deps]);

  return result;
}
