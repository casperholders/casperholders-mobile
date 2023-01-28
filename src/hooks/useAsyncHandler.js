import { useEffect, useState } from 'react';

/**
 * Abstract async handler
 * @param handler
 * @returns {[boolean,(function(): void)]}
 */
export default function useAsyncHandler(handler) {
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (submitting) {
      (async () => {
        try {
          await handler();
        } finally {
          setSubmitting(false);
        }
      })();
    }
  }, [submitting]);

  return [submitting, () => setSubmitting(true)];
}
