import * as Clipboard from 'expo-clipboard';
import { useState } from 'react';

export default function usePasteHandler(onPaste) {
  const [loading, setLoading] = useState(false);

  return async () => {
    if (!loading) {
      setLoading(true);
      onPaste(await Clipboard.getStringAsync());
      setLoading(false);
    }
  };
}
