import { useQuery } from '@tanstack/react-query';
import { getOne, getRandom } from '../boardgames/api-boardgames';

export default function useFetchBoardgame(id) {
  const fetchBoardgame = async () => {
    if (!id) {
      return;
    }
    return getOne(id);
  };

  return useQuery({
    queryKey: ['boardgame', id],
    queryFn: fetchBoardgame,
    staleTime: 5 * (60 * 1000), //5m
  });
}
