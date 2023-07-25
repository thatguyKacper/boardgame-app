// import { useState, useEffect } from 'react';
import UserList from './UserList';
import MainPage from '../pages/MainPage';
import Loader from '../components/Loader';
import useFetchUsers from '../hooks/useFetchUsers';
import toast from 'react-hot-toast';
import useSearchStore from '../searchStore';
import Pagination from '../components/Pagination';

export default function Users() {
  const { page } = useSearchStore();

  const {
    isLoading,
    isSuccess,
    isError,
    data: { data: users, meta } = {},
  } = useFetchUsers(page);

  return (
    <MainPage>
      <h2>Users</h2>
      {isLoading && <Loader />}
      {isError && toast.error('Could not fetch users')}
      {isSuccess && <UserList users={users} />}
      {/* <Pagination meta={meta} /> */}
    </MainPage>
  );
}
