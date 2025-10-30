import { Platform } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const createNoopStorage = () => {
  return {
    getItem(_key) {
      return Promise.resolve(null);
    },
    setItem(_key, value) {
      return Promise.resolve(value);
    },
    removeItem(_key) {
      return Promise.resolve();
    },
  };
};

const storage =
  Platform.OS === 'web' && typeof window === 'undefined'
    ? createNoopStorage()
    : AsyncStorage;

export default storage;