import { UseQueryResult, useQuery } from '@tanstack/react-query';
import { getTop } from '../boardgames/api-boardgames';
import { Boardgame } from '../types/boardgame';
import { Meta } from '../types/meta';

export default function useTop(query: string): UseQueryResult<{ data: Boardgame[], meta: Meta[] }> {
  const fetchTopBoardgames = async () => {
    if (!query) {
      return;
    }

    return getTop(query);
  };

  return useQuery({
    queryKey: ['top', query],
    queryFn: fetchTopBoardgames,
  });
}
