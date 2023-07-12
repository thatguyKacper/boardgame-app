import { useState, useEffect } from 'react';
import MainPage from '../pages/MainPage';
import Loader from '../components/Loader';
import ErrorMessage from '../components/Error';
import { useLocation, useSearchParams } from 'react-router-dom';
import BoardgameTopList from './BoardgamesTopList';

export default function BoardgamesTop() {
  const location = useLocation();
  const { query } = location.state;
  const [searchParams] = useSearchParams();
  const [games, setGames] = useState([]);
  const [page, setPage] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const title = searchParams.get('top');

  useEffect(() => {
    const read = async () => {
      setIsLoading(true);
      try {
        const res = await fetch('/api/boardgames/lists?page=1' + query);

        if (!res.ok) {
          throw new Error('Failed to fetch data');
        }

        const { data, meta } = await res.json();

        setGames(data);
        setPage(meta);
      } catch (err) {
        console.log(err.message);
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    read();
  }, [query]);

  return (
    <MainPage>
      <h2>Top 10 most {title}</h2>
      {isLoading && <Loader />}
      {!isLoading && !error && (
        <BoardgameTopList games={games} meta={page} title={title} />
      )}
      {error && <ErrorMessage message={error} />}
    </MainPage>
  );
}
