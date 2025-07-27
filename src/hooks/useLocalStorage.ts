import { useState } from 'react';

function useLocalStorage(key: string, initialValue: string) {
  const [storedValue, setStoredValue] = useState(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item ?? initialValue;
    } catch {
      return initialValue;
    }
  });

  const setValue = (value: string) => {
    try {
      setStoredValue(value);
      window.localStorage.setItem(key, value);
    } catch {
      console.warn('Could not store value in localStorage', Error);
    }
  };

  return [storedValue, setValue] as const;
}

export default useLocalStorage;
