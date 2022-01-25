import { APP_DISABLE_EVENT_SOURCES, APP_RPC_URL } from '@env';
import { useEffect, useState } from 'react';
import RNEventSource from 'react-native-event-source';

export default function useEventSource(eventSourceUrl, listener) {
  const [eventSource, setEventSource] = useState(undefined);
  const stopListening = () => {
    if (eventSource) {
      eventSource.removeAllListeners();
      eventSource.close();
      setEventSource(undefined);
    }
  };

  useEffect(() => {
    if (!APP_DISABLE_EVENT_SOURCES) {
      setEventSource(new RNEventSource(`${APP_RPC_URL}/events/?start_from=0`));

      return stopListening;
    }
  }, []);

  useEffect(() => {
    if (eventSource) {
      eventSource.addEventListener('message', listener);
    }
  }, [eventSource]);

  return stopListening;
}
