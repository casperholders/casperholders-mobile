import { STATUS_UNKNOWN } from '@casperholders/core/dist/services/results/deployResult';
import { useSelector } from 'react-redux';

export default function usePendingDeployResultsCount() {
  return useSelector(
    (state) => Object.values(state.operations.deployResultsByHash)
      .filter((d) => d.status === STATUS_UNKNOWN)
      .length,
  );
}
