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
    queryKey:
      searchCategory && searchText
        ? ['boardgames', page, searchCategory, searchText]
        : ['boardgames', page],
    queryFn: fetchBoardgames,
    staleTime: 10 * (60 * 1000), //10m
    cacheTime: 15 * (60 * 1000), // 15m
  });
}
