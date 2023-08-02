import { UseQueryResult, useQuery } from '@tanstack/react-query';
import { getAll } from '../boardgames/api-boardgames';
import { Boardgame } from '../types/boardgame';
import { Meta } from '../types/meta';

export default function useFetchBoardgames(
  page: number,
  searchCategory: string,
  searchText: string,
  sortBy: string,
  sortOrder: string
): UseQueryResult<{ data: Boardgame[], meta: Meta[] }> {
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
