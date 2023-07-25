import { useQuery } from '@tanstack/react-query';
import { getAll, getOne } from '../users/api-users';

export default function useFetchUsers(page, id) {
  const fetchUsers = async () => {
    if (id) {
      return getOne(id);
    } else {
      return getAll(page);
    }
  };

  return useQuery({
    queryKey: ['users', page, id],
    queryFn: fetchUsers,
  });
}
