import { useEffect, useState } from 'react';

type User = {
  id: string;
  name: string;
};

type Loader = 'pending' | 'success' | 'error';

export default function useUsers() {
  const [users, setUsers] = useState<User[]>([]);
  const [loader, setLoader] = useState<Loader>('pending');
  const [error, setError] = useState<string>();

  useEffect(() => {
    setLoader('pending');
    const url = 'https://jsonplaceholder.typicode.com/users';
    fetch(url)
      .then((response) => {
        if (!response.ok) throw new Error(`${response.status}`);
        return response.json() as Promise<User[]>;
      })
      .then((data: User[]) => {
        setLoader('success');
        setUsers(data);
      })
      .catch((e: Error) => {
        setLoader('error');
        setError(e.message);
        console.log(e);
      });
  }, []);

  return { users, loader, error };
}
