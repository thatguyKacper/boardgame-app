import MainPage from '../pages/MainPage';
import Loader from '../components/Loader';
import { useLocation, useSearchParams } from 'react-router-dom';
import BoardgameTopList from './BoardgamesTopList';
import useTop from '../hooks/useTop';
import toast from 'react-hot-toast';

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
  } = useTop(query);

  return (
    <MainPage>
      <h2>Top 10 most {title}</h2>
      {isLoading && <Loader />}
      {isError && toast.error('Could not fetch boardgames')}
      {isSuccess && <BoardgameTopList boardgames={boardgames} title={title} />}
    </MainPage>
  );
}
