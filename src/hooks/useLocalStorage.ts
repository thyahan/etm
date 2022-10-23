import { useState } from "react";

const useLocalStorage = (key: string, defaultValue: string): [string, (s: string) => void] => {
  const [state, setState] = useState(() => {
    if (typeof window === "undefined") return defaultValue;

    const item = window.localStorage.getItem(key);

    if (item) return item;
    return defaultValue;
  });

  const updateLocalStorage = (value: string) => {
    window.localStorage.setItem(key, value);
    setState(value);
  };

  return [state, updateLocalStorage];
};

export default useLocalStorage;
