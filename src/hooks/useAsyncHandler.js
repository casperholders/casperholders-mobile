import { useEffect, useState } from 'react';

export default function useAsyncHandler(handler) {
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (submitting) {
      (async () => {
        try {
          await handler();
        } catch (error) {
          throw error;
        } finally {
          setSubmitting(false);
        }
      })();
    }
  }, [submitting]);

  return [submitting, () => setSubmitting(true)];
}
