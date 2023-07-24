import BoardgameList from './BoardgameList';
import MainPage from '../pages/MainPage';
import Loader from '../components/Loader';
import ErrorMessage from '../components/Error';
import useFetch from '../hooks/useFetch';
import Pagination from '../components/Pagination';
import usePageStore from '../store';
import Search from '../components/Search';

export default function Boardgames() {
  const { page, searchCategory, searchText } = usePageStore();

  const {
    isLoading,
    isSuccess,
    isError,
    data: { data: boardgames, meta } = {},
    error,
  } = useFetch(page, searchCategory, searchText);

  return (
    <>
      {isLoading && <Loader />}
      {isSuccess && (
        <MainPage>
          <h2>Boardgames</h2>
          <Search />
          <BoardgameList boardgames={boardgames} />
          {isError && <ErrorMessage message={error} />}
          <Pagination meta={meta} />
        </MainPage>
      )}
    </>
  );
}
