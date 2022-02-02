import { STATUS_UNKNOWN } from '@casperholders/core/dist/services/results/deployResult';
import { useSelector } from 'react-redux';

/**
 * Retrieve pending operations number from the state
 * @returns {number}
 */
export default function usePendingDeployResultsCount() {
  return useSelector(
    (state) => Object.values(state.operations.deployResultsByHash)
      .filter((d) => d.status === STATUS_UNKNOWN)
      .length,
  );
}
