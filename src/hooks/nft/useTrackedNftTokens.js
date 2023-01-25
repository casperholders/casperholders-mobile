import useJsonStorage from '@/hooks/useJsonStorage';

export default function useTrackedNftTokens(activeKey) {
  return useJsonStorage(`@tracked_nft_tokens.${activeKey}`);
};
