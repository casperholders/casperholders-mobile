import usePublicKey from '@/hooks/auth/usePublicKey';
import useAsyncData from '@/hooks/useAsyncData';
import useNetwork from '@/hooks/useNetwork';
import balanceService from '@/services/balanceService';
import AsyncStorage from "@react-native-async-storage/async-storage";

/**
 * Retrieve previous keys
 * @param setReloadKeys
 * @param deps
 * @returns {[boolean,unknown,unknown]|*}
 */
export default function usePreviousKeys(setReloadKeys, deps = []) {
  return useAsyncData(async () => {
    setReloadKeys(false);
    return JSON.parse(await AsyncStorage.getItem('@previous_public_keys'));
  }, [...deps]);
}
