import { create } from 'zustand';
import { mountStoreDevtool } from 'simple-zustand-devtools';

const useSearchStore = create((set) => ({
  page: 1,
  searchCategory: '',
  searchText: '',
  sortBy: '',
  sortOrder: '',
  handleNextPage: () => set((state) => ({ page: state.page + 1 })),
  handlePrevPage: () => set((state) => ({ page: state.page - 1 })),
  handleSetPage: (value) => set((state) => ({ page: (state.page = value) })),
  handleSearchCategory: (value) =>
    set((state) => ({ searchCategory: (state.searchCategory = value) })),
  handleSearchText: (text) =>
    set((state) => ({ searchText: (state.searchText = text) })),
  handleSortBy: (name) => set((state) => ({ sortBy: (state.sortBy = name) })),
  handleSortOrder: (order) =>
    set((state) => ({ sortOrder: (state.sortOrder = order) })),
}));

mountStoreDevtool('store', useSearchStore);

export default useSearchStore;
