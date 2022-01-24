import { useSelector } from 'react-redux';

export default function useDeployResultsHashs() {
  return useSelector((state) => Object.keys(state.operations.deployResultsByHash));
}
