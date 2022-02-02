import * as Clipboard from 'expo-clipboard';
import { useState } from 'react';

/**
 * Paste clipboard handler
 * @param onPaste
 * @returns {(function(): Promise<void>)|*}
 */
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
