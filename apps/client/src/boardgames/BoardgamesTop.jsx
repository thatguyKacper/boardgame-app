import MainPage from '../pages/MainPage';
import Loader from '../components/Loader';
import ErrorMessage from '../components/Error';
import { useLocation, useSearchParams } from 'react-router-dom';
import BoardgameTopList from './BoardgamesTopList';
import useTop from '../hooks/useTop';

export default function BoardgamesTop() {
  const location = useLocation();
  const { query } = location.state;
  const [searchParams] = useSearchParams();
  const title = searchParams.get('top');

  const {
    isLoading,
    isSuccess,
    isError,
    data: { data: boardgames } = {},
    error,
  } = useTop(query);

  return (
    <MainPage>
      <h2>Top 10 most {title}</h2>
      {isLoading && <Loader />}
      {isError && <ErrorMessage message={error.message} />}
      {isSuccess && <BoardgameTopList boardgames={boardgames} title={title} />}
    </MainPage>
  );
}
