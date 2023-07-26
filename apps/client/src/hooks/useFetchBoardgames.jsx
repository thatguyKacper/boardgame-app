import { useQuery } from '@tanstack/react-query';
import { getAll, getSearch } from '../boardgames/api-boardgames';

export default function useFetchBoardgames(page, searchCategory, searchText) {
  const fetchBoardgames = async () => {
    if (searchCategory && searchText) {
      return getSearch(page, searchCategory, searchText);
    } else {
      return getAll(page);
    }
  };

  return useQuery({
    queryKey: ['boardgames', page, searchCategory, searchText],
    queryFn: fetchBoardgames,
    staleTime: 1 * 60 * 1000, //1m
  });
}
