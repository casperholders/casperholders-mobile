import { useEffect, useState } from 'react';

export default function useAsyncHandler(handler) {
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    async function callHandler() {
      try {
        await handler();
      } catch (error) {
        throw error;
      } finally {
        setSubmitting(false);
      }
    }

    if (submitting) {
      callHandler();
    }
  }, [submitting]);

  return [submitting, () => setSubmitting(true)];
}
