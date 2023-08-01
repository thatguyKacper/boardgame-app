import { useQuery } from '@tanstack/react-query';
import { getTop } from '../boardgames/api-boardgames';

export default function useTop(query) {
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
