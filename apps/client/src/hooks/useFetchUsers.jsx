import { useQuery } from '@tanstack/react-query';
import { getAll, getOne } from '../users/api-users';

export default function useFetchUsers(page) {
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
