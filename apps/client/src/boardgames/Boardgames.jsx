import { useState, useEffect } from 'react';
import BoardgameList from './BoardgameList';
import MainPage from '../pages/MainPage';
import Loader from '../components/Loader';
import ErrorMessage from '../components/Error';

export default function Boardgames() {
  const [games, setGames] = useState([]);
  const [page, setPage] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    const read = async () => {
      setIsLoading(true);
      try {
        const res = await fetch('/api/boardgames');

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
  }, []);

  return (
    <MainPage>
      <h2>Boardgames</h2>
      {isLoading && <Loader />}
      {!isLoading && !error && <BoardgameList games={games} meta={page} />}
      {error && <ErrorMessage message={error} />}
    </MainPage>
  );
}
