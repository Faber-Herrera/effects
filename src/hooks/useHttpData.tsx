import { useEffect, useState } from 'react';

type Loader = 'pending' | 'success' | 'error';

export default function useHttpData<T>(url: string) {
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

  const addData = async (element: T) => {
    const initialData = [...data];
    setData([{ id: 0, ...element }, ...data]);
    try {
      const response = await fetch(url, {
        method: 'POST',
        body: JSON.stringify(element),
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        setData(initialData);
        throw new Error(`${response.status}`);
      }

      const savedData = await response.json();
      setData([savedData, ...initialData]);
    } catch (error) {
      setError((error as Error).message);
    }
  };

  return { data, loader, error, addData };
}
