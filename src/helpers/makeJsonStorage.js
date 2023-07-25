import AsyncStorage from '@react-native-async-storage/async-storage';

export default function makeJsonStorage(key) {
  return {
    get() {
      return (async () => {
        const storageContent = await AsyncStorage.getItem(key);

        return storageContent ? JSON.parse(storageContent) : undefined;
      })();
    },
    set(value) {
      return (async () => {
        if (value === undefined) {
          await AsyncStorage.removeItem(key);
        } else {
          await AsyncStorage.setItem(key, JSON.stringify(value));
        }
      })();
    },
  };
}
