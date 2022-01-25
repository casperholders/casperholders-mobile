import { useSelector } from 'react-redux';

export default function useDeployResultsCount() {
  return useSelector((state) => Object.values(state.operations.deployResultsByHash).length);
}
