import { useEffect, useState } from 'react';
import { Navigate, useParams } from 'react-router-dom';
import Loader from '../components/Loader';
import { isAuthenticated } from './auth-helper';

export default function PrivateRoute({ children }) {
  const { id } = useParams();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const { token } = isAuthenticated();

  useEffect(() => {
    const read = async () => {
      setIsLoading(true);
      try {
        const res = await fetch(`/api/profile/${id}`, {
          method: 'GET',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + token,
          },
        });

        if (!res.ok) {
          throw new Error('Unauthorized');
        }

        // const data = await res.json();
      } catch (err) {
        console.log(err.message);
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    read();
  }, [id]);

  return (
    <>
      {isLoading && <Loader />}
      {!isLoading && !error && children}
      {!isLoading && error && <Navigate to="/signin" replace />}
    </>
  );
}
