import { Navigate } from 'react-router-dom';
import Loader from '../components/Loader';
import { isAuthenticated } from './auth-helper';
import useFetchUser from '../hooks/useFetchUser';

export default function PrivateRoute({ children }) {
  const { id } = isAuthenticated();

  const { isLoading, isSuccess, isError, data } = useFetchUser(id);

  return (
    <>
      {isLoading && <Loader />}
      {isSuccess && children}
      {isError && <Navigate to="/signin" replace />}
    </>
  );
}
