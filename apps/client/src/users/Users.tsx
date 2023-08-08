import UserList from './UserList';
import MainLayout from '../components/MainLayout';
import Loader from '../components/Loader';
import useFetchUsers from '../hooks/useFetchUsers';
import toast from 'react-hot-toast';
import useSearchStore from '../searchStore';
import Pagination from '../components/Pagination';

export default function Users() {
  const { page, sortBy, sortOrder  } = useSearchStore();

  const {
    isLoading,
    isSuccess,
    isError,
    data: { data: users, meta } = {},
  } = useFetchUsers(page, sortBy, sortOrder );

  return (
    <MainLayout>
      {isLoading && <Loader />}
      {isError && toast.error('Could not fetch users')}
      {isSuccess && (
        <>
          <h1 className="pb-4">Users</h1>
          <UserList users={users} />
          <Pagination meta={meta} />
        </>
      )}
    </MainLayout>
  );
}
