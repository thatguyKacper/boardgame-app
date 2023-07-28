import { useQuery } from '@tanstack/react-query';
import { getAll } from '../boardgames/api-boardgames';

export default function useFetchBoardgames(
  page,
  searchCategory,
  searchText,
  sortBy,
  sortOrder
) {
  const fetchBoardgames = async () =>
    getAll(page, searchCategory, searchText, sortBy, sortOrder);

  const queryKey = ['boardgames', page];

  if (searchCategory && searchText) {
    queryKey.push(searchCategory, searchText);
  }

  if (sortBy && sortOrder) {
    queryKey.push(sortBy, sortOrder);
  }

  return useQuery(queryKey, fetchBoardgames, {
    staleTime: 10 * (60 * 1000), //10m
    cacheTime: 15 * (60 * 1000), // 15m
  });
}
