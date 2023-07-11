import { useState, useEffect } from 'react';
import BoardgameList from './BoardgameList';
import MainPage from '../pages/MainPage';
import Loader from '../components/Loader';
import ErrorMessage from '../components/Error';

export default function Boardgames() {
  const [games, setGames] = useState([]);
  const [page, setPage] = useState(1);
  const [lastPage, setLastPage] = useState(0);
  const [prevPage, setPrevPage] = useState(1);
  const [nextPage, setNextPage] = useState(2);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    const read = async () => {
      setIsLoading(true);
      try {
        const res = await fetch(`/api/boardgames?page=${page}`);

        if (!res.ok) {
          throw new Error('Failed to fetch data');
        }

        const { data, meta } = await res.json();

        setGames(data);
        setLastPage(meta.last_page);
        setNextPage(meta.next_page);
        setPrevPage(meta.prev_page);
      } catch (err) {
        console.log(err.message);
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    read();
  }, [page]);

  const handleNextPage = () => {
    if (page < lastPage) {
      setPage(page + 1);
    }
  };

  const handlePrevPage = () => {
    if (page >= 1) {
      setPage(page - 1);
    } else {
      setPage(1);
    }
  };

  return (
    <MainPage>
      <h2>Boardgames</h2>
      {isLoading && <Loader />}
      {!isLoading && !error && <BoardgameList games={games} meta={page} />}
      {error && <ErrorMessage message={error} />}
      <nav aria-label="Page navigation example">
        <ul className="pagination">
          {prevPage > 0 && (
            <>
              <li className="page-item">
                <button className="page-link" onClick={handlePrevPage}>
                  Previous
                </button>
              </li>

              <li className="page-item">
                <button className="page-link" onClick={handlePrevPage}>
                  {prevPage}
                </button>
              </li>
            </>
          )}
          {page < lastPage && (
            <>
              <li className="page-item">
                <button className="page-link">{page}</button>
              </li>
              <li className="page-item">
                <button className="page-link" onClick={handleNextPage}>
                  {nextPage}
                </button>
              </li>
              <li className="page-item">
                <span className="page-link">...</span>
              </li>
              <li className="page-item">
                <button className="page-link" onClick={() => setPage(lastPage)}>
                  {lastPage}
                </button>
              </li>
              <li className="page-item">
                <button className="page-link" onClick={handleNextPage}>
                  Next
                </button>
              </li>
            </>
          )}
        </ul>
      </nav>
    </MainPage>
  );
}
