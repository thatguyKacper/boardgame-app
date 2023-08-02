import { Navigate } from 'react-router-dom';
import Loader from '../components/Loader';
import { isAuthenticated } from './auth-helper';
import useFetchUser from '../hooks/useFetchUser';
import { ReactNode } from 'react';

export default function PrivateRoute({ children }: {children: ReactNode}) {
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
