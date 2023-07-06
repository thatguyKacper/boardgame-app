import { useEffect, useState } from 'react';
import { Navigate, useParams } from 'react-router-dom';

export default function PrivateRoute({ children }) {
  const { id } = useParams();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const credentials = JSON.parse(sessionStorage.getItem('jwt'));

  useEffect(() => {
    const read = async () => {
      setIsLoading(true);
      try {
        const res = await fetch(`/api/profile/${id}`, {
          method: 'GET',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + credentials,
          },
        });

        if (!res.ok) {
          throw new Error('Unauthorized');
        }

        const data = await res.json();

        console.log(data);
      } catch (err) {
        console.log(err.message);
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    read();
  }, [id]);

  function Loader() {
    return (
      <div className="d-flex justify-content-center">
        <div className="spinner-border" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  return (
    <>
      {isLoading && <Loader />}
      {!isLoading && !error && children}
      {!isLoading && error && <Navigate to="/signin" replace />}
    </>
  );
}
