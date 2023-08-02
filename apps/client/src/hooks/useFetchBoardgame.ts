import { UseQueryResult, useQuery } from '@tanstack/react-query';
import { getOne } from '../boardgames/api-boardgames';
import { Boardgame } from '../types/boardgame';

export default function useFetchBoardgame(id: number): UseQueryResult<{ data: Boardgame}> {
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
