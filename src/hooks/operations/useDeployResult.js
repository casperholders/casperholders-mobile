import { useSelector } from 'react-redux';

/**
 * Retrieve deploy result from hash
 * @param hash
 * @returns {*}
 */
export default function useDeployResult(hash) {
  return useSelector((state) => state.operations.deployResultsByHash[hash]);
}
