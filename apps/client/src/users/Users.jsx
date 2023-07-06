import { useState, useEffect } from 'react';
import UserList from './UserList';
import MainPage from '../pages/MainPage';

export default function Users() {
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    const read = async () => {
      setIsLoading(true);
      try {
        const res = await fetch('/api/users');

        if (!res.ok) {
          throw new Error('Failed to fetch data');
        }

        const data = await res.json();

        setUsers(data);
      } catch (err) {
        console.log(err.message);
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    read();
  }, []);

  function Loader() {
    return (
      <div className="d-flex justify-content-center">
        <div className="spinner-border" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  function ErrorMessage({ message }) {
    return (
      <div className="alert alert-danger" role="alert">
        {message}
      </div>
    );
  }

  return (
    <MainPage>
      <h2>Users</h2>
      {isLoading && <Loader />}
      {!isLoading && !error && <UserList users={users} />}
      {error && <ErrorMessage message={error} />}
    </MainPage>
  );
}
