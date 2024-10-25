import useHttpData from './hooks/useFetchData';

type User = {
  id: string;
  name: string;
};

function App() {
  const url = 'https://jsonplaceholder.typicode.com/users';
  const { data: users, loader, error } = useHttpData<User>(url);

  return (
    <>
      {loader === 'pending' ? <span>Cargando...</span> : null}
      {loader === 'success' && users.length > 0 ? (
        <ul>
          {users.map((u: User) => (
            <li key={u.id}>{u.name}</li>
          ))}
        </ul>
      ) : null}
      {loader === 'error' ? <span>Ocurrió un error: {error}</span> : null}
    </>
  );
}

export default App;
