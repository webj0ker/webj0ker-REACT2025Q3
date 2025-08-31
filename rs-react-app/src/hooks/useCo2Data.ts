import { useState, useEffect } from 'react';

export function useCo2Data() {
  const [data, setData] = useState<Record<string, any> | null>(null);

  useEffect(() => {
    fetch('/co2-data.json')
      .then(res => res.json())
      .then(setData);
  }, []);

  return data;
}