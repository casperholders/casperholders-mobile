import { useSelector } from 'react-redux';

/**
 * Retrieve deploy result number
 * @returns {number}
 */
export default function useDeployResultsCount() {
  return useSelector((state) => Object.values(state.operations.deployResultsByHash).length);
}
