import { UseQueryResult, useQuery } from '@tanstack/react-query';
import { getAll } from '../users/api-users';
import { User } from '../types/user';
import { Meta } from '../types/meta';

export default function useFetchUsers(page: number): UseQueryResult<{ data: User[], meta: Meta[] }> {
  const fetchUsers = async () => {
    if (!page) {
      return;
    } else {
      return getAll(page);
    }
  };

  return useQuery({
    queryKey: ['users', page],
    queryFn: fetchUsers,
  });
}
