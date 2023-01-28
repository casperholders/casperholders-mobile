import makeJsonStorage from '@/helpers/makeJsonStorage';
import { useMemo } from 'react';

export default function useTrackedNftTokens(activeKey) {
  return useMemo(() => makeJsonStorage(`@tracked_nft_tokens.${activeKey}`), [activeKey]);
};
