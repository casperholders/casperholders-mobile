import { useSelector } from 'react-redux';

/**
 * Retrieve deploy results hashes
 * @returns {string[]}
 */
export default function useDeployResultsHashs() {
  return useSelector((state) => Object.keys(state.operations.deployResultsByHash));
}
