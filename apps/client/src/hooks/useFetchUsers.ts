import { UseQueryResult, useQuery } from '@tanstack/react-query';
import { getAll } from '../users/api-users';
import { User } from '../interfaces/user';
import { Meta } from '../interfaces/meta';

export default function useFetchUsers(page: number, sortBy: string, sortOrder: string): UseQueryResult<{ data: User[], meta: Meta }> {
  const fetchUsers = async () => {
    if (!page) {
      return;
    } else {
      return getAll(page, sortBy, sortOrder);
    }
  };

  const queryKey = ['users', page];

  if (sortBy && sortOrder) {
    queryKey.push(sortBy, sortOrder);
  }

  return useQuery(queryKey, fetchUsers);
}
