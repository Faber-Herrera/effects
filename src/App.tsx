import useHttpData from './hooks/useHttpData';

type User = {
  id?: string;
  name: string;
};

function App() {
  const url = 'https://jsonplaceholder.typicode.com/users';
  const { data: users, loader, error, addData: addUser } = useHttpData<User>(url);

  return (
    <>
      {loader === 'pending' ? <span>Cargando...</span> : null}
      {loader === 'success' && users.length > 0 ? (
        <ul>
          <button onClick={() => addUser({ name: 'Canchito feliz' })}>Enviar</button>
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
