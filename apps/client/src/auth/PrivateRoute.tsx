import { Navigate } from 'react-router-dom';
import Loader from '../components/Loader';
import { isAuthenticated } from './auth-helper';
import useFetchUser from '../hooks/useFetchUser';
import { Auth } from '../interfaces/auth';
import { ChildrenInterface } from '../interfaces/components';

export default function PrivateRoute({ children }: ChildrenInterface) {
  const session = isAuthenticated();

  if(!session) {
    return <Navigate to="/signin" replace />
  }

  const { id } = session as Auth;

  const { isLoading, isSuccess, isError } = useFetchUser(id);

  if(!isAuthenticated) {
    return
  }

  return (
    <>
      {isLoading && <Loader />}
      {isSuccess && children}
      {isError && <Navigate to="/signin" replace />}
    </>
  );
}
