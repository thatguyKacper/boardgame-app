import BoardgameList from './BoardgameList';
import MainLayout from '../components/MainLayout';
import Loader from '../components/Loader';
import useFetchBoardgames from '../hooks/useFetchBoardgames';
import Pagination from '../components/Pagination';
import useSearchStore from '../searchStore';
import Search from '../components/Search';
import toast from 'react-hot-toast';

export default function Boardgames() {
  const { page, searchCategory, searchText, sortBy, sortOrder } =
    useSearchStore();

  const {
    isLoading,
    isSuccess,
    isError,
    data: { data: boardgames, meta } = {},
  } = useFetchBoardgames(page, searchCategory, searchText, sortBy, sortOrder);  

  return (
    <MainLayout>
      {isLoading && <Loader />}
      {isError && toast.error('Could not fetch boardgames')}
      {isSuccess && (
        <>
          <h1 className="pb-4 border-bottom">Boardgames</h1>
          <Search />
          {boardgames ? 
          <BoardgameList boardgames={boardgames} />
          :
          toast.error('Could not fetch boardgames')
        }
          <Pagination meta={meta} />
        </>
      )}
    </MainLayout>
  );
}
