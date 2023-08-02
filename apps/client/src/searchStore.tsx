import { create } from 'zustand';
import { mountStoreDevtool } from 'simple-zustand-devtools';

interface SearchStore {
  page: number,
  searchCategory: string,
  searchText: string,
  sortBy: string,
  sortOrder: string,
  handleSetPage: (page: number) => void,
  handleSearchCategory: (category: string) => void,
  handleSearchText: (search: string) => void,
  handleSortBy: (sort: string) => void,
  handleSortOrder: (order: string) => void
}

const useSearchStore = create<SearchStore>((set) => ({
  page: 1,
  searchCategory: '',
  searchText: '',
  sortBy: '',
  sortOrder: '',
  handleSetPage: (page) => set(() => ({ page: page })),
  handleSearchCategory: (category) => set(() => ({ searchCategory: category })),
  handleSearchText: (search) => set(() => ({ searchText:  search })),
  handleSortBy: (sort) => set(() => ({ sortBy: sort })),
  handleSortOrder: (order) => set(() => ({ sortOrder: order })),
}));

mountStoreDevtool('store', useSearchStore);

export default useSearchStore;
