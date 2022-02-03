import { clearDeployResults } from '@/store/reducers/operationsReducer';
import { useDispatch } from 'react-redux';

/**
 * Clear all deploy results
 * @returns {function(): any}
 */
export default function useDispatchClearDeployResults() {
  const dispatch = useDispatch();

  return () => dispatch(clearDeployResults());
}
