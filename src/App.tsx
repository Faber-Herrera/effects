import useUsers from './hooks/useUsers';

function App() {
  const { users, loader, error } = useUsers();
  return (
    <>
      {loader === 'pending' ? <span>Cargando...</span> : null}
      {loader === 'success' && users.length > 0 ? (
        <ul>
          {users.map((u) => (
            <li key={u.id}>{u.name}</li>
          ))}
        </ul>
      ) : null}
      {loader === 'error' ? <span>Ocurrió un error: {error}</span> : null}
    </>
  );
}

export default App;
