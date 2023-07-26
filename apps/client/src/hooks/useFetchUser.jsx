import { useQuery } from '@tanstack/react-query';
import { getOne } from '../users/api-users';

export default function useFetchUser(id) {
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
