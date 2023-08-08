import { UseQueryResult, useQuery } from '@tanstack/react-query';
import { getOne } from '../boardgames/api-boardgames';
import { Boardgame } from '../interfaces/boardgame';

export default function useFetchBoardgame(id: number): UseQueryResult<Boardgame> {
  const fetchBoardgame = async () => {
    if (!id) {
      return;
    }
    return getOne(id);
  };

  return useQuery({
    queryKey: ['boardgame', id],
    queryFn: fetchBoardgame,
  });
}
