import { create } from 'zustand';
import { mountStoreDevtool } from 'simple-zustand-devtools';

const useSearchStore = create((set) => ({
  page: 1,
  searchCategory: '',
  searchText: '',
  handleNextPage: () => set((state) => ({ page: state.page + 1 })),
  handlePrevPage: () => set((state) => ({ page: state.page - 1 })),
  handleSetPage: (value) => set((state) => ({ page: (state.page = value) })),
  handleSearchCategory: (value) =>
    set((state) => ({ searchCategory: (state.searchCategory = value) })),
  handleSearchText: (text) =>
    set((state) => ({ searchText: (state.searchText = text) })),
}));

mountStoreDevtool('store', useSearchStore);

export default useSearchStore;
