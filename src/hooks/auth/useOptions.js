import { selectOptions } from '@/store/reducers/authReducer';
import { useSelector } from 'react-redux';

/**
 * Return deploys options
 * @returns {unknown}
 */
export default function useOptions() {
  return useSelector(selectOptions);
}
