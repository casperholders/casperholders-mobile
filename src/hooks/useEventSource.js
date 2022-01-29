import useNetwork from '@/hooks/useNetwork';
import { APP_DISABLE_EVENT_SOURCES } from '@env';
import { useEffect, useState } from 'react';
import RNEventSource from 'react-native-event-source';

export default function useEventSource(listener) {
  const network = useNetwork();
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
      setEventSource(new RNEventSource(`${network.rpcUrl}/events/?start_from=0`));

      return stopListening;
    }
  }, [network]);

  useEffect(() => {
    if (eventSource) {
      eventSource.addEventListener('message', listener);
    }
  }, [eventSource]);

  return stopListening;
}
