import { create } from 'zustand';

const useStore = create((set) => ({
  page: 1,
  searchCategory: '',
  searchText: '',
  handleNextPage: () => set((state) => ({ page: state.page + 1 })),
  handlePrevPage: () => set((state) => ({ page: state.page - 1 })),
  handleSetPage: (value) => set((state) => ({ page: (state.page = value) })),
  handleSearchCategory: (category) =>
    set((state) => ({ searchCategory: (state.searchCategory = category) })),
  handleSearchText: (text) =>
    set((state) => ({ searchText: (state.searchText = text) })),
}));

export default useStore;
