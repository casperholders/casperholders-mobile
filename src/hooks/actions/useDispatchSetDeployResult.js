import deployResultToObject from '@/helpers/deployResultToObject';
import { setDeployResult } from '@/store/reducers/operationsReducer';
import { useDispatch } from 'react-redux';

/**
 * Set a deploy result
 * @returns {function({deployResult: *}): any}
 */
export default function useDispatchSetDeployResult() {
  const dispatch = useDispatch();

  return ({ deployResult }) => dispatch(setDeployResult({
    deployResult: deployResultToObject(deployResult),
  }));
}
