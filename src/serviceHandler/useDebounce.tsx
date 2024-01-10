import React from "react";

type DebounceFunction = (...args: any[]) => void;

export const useDebounce = (
  callback: DebounceFunction,
  delay: number
): DebounceFunction => {
  const [timeoutId, setTimeoutId] = React.useState<NodeJS.Timeout | null>(null);

  return function (...args: any[]) {
    if (timeoutId) {
      clearTimeout(timeoutId);
    }

    const newTimeoutId = setTimeout(() => {
      callback(...args);
    }, delay);

    setTimeoutId(newTimeoutId);
  };
};
