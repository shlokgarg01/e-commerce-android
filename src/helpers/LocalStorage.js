import AsyncStorage from '@react-native-async-storage/async-storage';

export const getValue = async key => {
  const value = await AsyncStorage.getItem(key);
  return value != null ? JSON.parse(value) : null;
};

export const setValue = async (key, value) => {
  const data = JSON.stringify(value);
  const x = await AsyncStorage.setItem(key, data);
  return x;
};

export const getAll = async () => {
  const keys = await AsyncStorage.getAllKeys()
}

export const clearValues = async () => {
  await AsyncStorage.clear()
  return
}