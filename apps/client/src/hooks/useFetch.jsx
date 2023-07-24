import { useQuery } from '@tanstack/react-query';

export default function useFetch(page, searchCategory, searchText) {
  const fetchBoardgames = async () => {
    if (!searchCategory || !searchText) {
      const res = await fetch(`/api/boardgames?page=${page}`);
      const data = await res.json();
      return data;
    } else {
      const res = await fetch(
        `/api/boardgames?page=${page}&${searchCategory}=${searchText}`
      );
      const data = await res.json();
      return data;
    }
  };

  return useQuery({
    queryKey: ['boardgames', page, searchCategory, searchText],
    queryFn: fetchBoardgames,
    staleTime: 1 * 60 * 1000, //1m
  });
}
