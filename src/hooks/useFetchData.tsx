import { useEffect, useState } from 'react';

type Loader = 'pending' | 'success' | 'error';

export default function useFetchData<T>(url: string) {
  const [data, setData] = useState<T[]>([]);
  const [loader, setLoader] = useState<Loader>('pending');
  const [error, setError] = useState<string>();

  useEffect(() => {
    const controller = new AbortController();
    const { signal } = controller;
    async function hook() {
      try {
        setLoader('pending');
        const response = await fetch(url, { signal });
        if (!response.ok) throw new Error(`${response.status}`);
        const data: T[] = await response.json();
        setData(data);
        setLoader('success');
      } catch (error) {
        setError((error as Error).message);
        setLoader('error');
      }
    }

    hook();

    return () => controller.abort();
  }, []);

  return { data, loader, error };
}
