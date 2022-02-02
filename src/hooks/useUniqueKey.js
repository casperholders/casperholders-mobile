import { useState } from 'react';

/**
 * Generate unique keys for map display of components
 * @returns {[number,updateUniqueKey]}
 */
export default function useUniqueKey() {
  const [uniqueKey, setUniqueKey] = useState(0);
  const updateUniqueKey = () => {
    setUniqueKey(uniqueKey + (uniqueKey < 1000 ? 1 : -1));
  };

  return [uniqueKey, updateUniqueKey];
}
