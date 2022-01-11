import deployResultToObject from '@/helpers/deployResultToObject';
import { unsetDeployResult } from '@/store/reducers/operationsReducer';
import { useDispatch } from 'react-redux';

export default function useDispatchUnsetDeployResult() {
  const dispatch = useDispatch();

  return ({ deployResult }) => dispatch(unsetDeployResult({
    deployResult: deployResultToObject({ deployResult }),
  }));
}
