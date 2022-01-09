import { useSelector } from 'react-redux';

export default function useDeployResult(hash) {
  return useSelector((state) => state.operations.deployResultsByHash[hash]);
}
