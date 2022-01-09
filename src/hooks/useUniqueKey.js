import { useState } from 'react';

export default function useUniqueKey() {
  const [uniqueKey, setUniqueKey] = useState(0);
  const updateUniqueKey = () => {
    setUniqueKey(uniqueKey + (uniqueKey < 1000 ? 1 : -1));
  };

  return [uniqueKey, updateUniqueKey];
}
