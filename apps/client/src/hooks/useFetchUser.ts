import { UseQueryResult, useQuery } from '@tanstack/react-query';
import { getOne } from '../users/api-users';
import { User } from '../interfaces/user';

export default function useFetchUser(id: number): UseQueryResult<User> {
  const fetchUser = async () => {
    if (!id) {
      return;
    }
    return getOne(id);
  };

  return useQuery({
    queryKey: ['user', id],
    queryFn: fetchUser,
  });
}
