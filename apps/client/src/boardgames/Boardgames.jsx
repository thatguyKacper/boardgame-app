import { useState, useEffect } from 'react';
import BoardgameList from './BoardgameList';
import MainPage from '../pages/MainPage';
import Loader from '../components/Loader';
import ErrorMessage from '../components/Error';

export default function Boardgames() {
  const [games, setGames] = useState([]);
  const [searchResult, setSearchResult] = useState(false);
  const [page, setPage] = useState(1);
  const [nextPage, setNextPage] = useState(0);
  const [prevPage, setPrevPage] = useState(0);
  const [lastPage, setLastPage] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [searchField, setSearchField] = useState('');
  const [searchName, setSearchName] = useState('');

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

  const handleSubmit = (e) => {
    e.preventDefault();

    const search = async () => {
      setIsLoading(true);
      try {
        const res = await fetch(
          `/api/boardgames?page=${page}&${searchField}=${searchName}`
        );

        if (!res.ok) {
          throw new Error('No results');
        }

        const { data, meta } = await res.json();

        setGames(data);
        setPage(1);
        setLastPage(meta.last_page);
        setNextPage(meta.next_page);
        setPrevPage(meta.prev_page);
        setSearchResult(true);
      } catch (err) {
        console.log(err.message);
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };
    search();
  };

  const handleNextPage = () => {
    if (nextPage) {
      setPage(nextPage);
    }
  };

  const handlePrevPage = () => {
    if (prevPage) {
      setPage(prevPage);
    } else {
      setPage(1);
    }
  };

  return (
    <MainPage>
      <h2>Boardgames</h2>
      <div className="py-2 border-bottom mb-3">
        <div className="container d-flex flex-wrap justify-content-center">
          <form onSubmit={handleSubmit}>
            <div className="input-group">
              <input
                type="search"
                className="form-control"
                placeholder="Search..."
                aria-label="Search"
                onChange={(e) => setSearchName(e.target.value)}
              />
              <select
                className="form-select"
                id="inputGroupSelect04"
                aria-label="Example select with button addon"
                onChange={(e) => setSearchField(e.target.value)}
              >
                <option value="">Search by:</option>
                <option value="name">Name</option>
                <option value="designer">Designer</option>
                <option value="artist">Artist</option>
                <option value="yearpublished">Year published</option>
                <option value="minplayers">Min players</option>
                <option value="maxplayers">Max players</option>
                <option value="minage">Min age</option>
                <option value="playingtime">Playing time</option>
                <option value="publisher">Publisher</option>
                <option value="category">Category</option>
                <option value="mechanic">Mechanic</option>
              </select>
              {!searchField || !searchName ? (
                <button className="btn disabled" type="submit">
                  Search
                </button>
              ) : (
                <button className="btn btn-primary" type="submit">
                  Search
                </button>
              )}
            </div>
          </form>
        </div>
      </div>
      {isLoading && <Loader />}
      {!isLoading && !error && !searchResult && (
        <BoardgameList games={games} meta={page} />
      )}
      {!isLoading && !error && searchResult && (
        <BoardgameList games={games} meta={page} search={searchField} />
      )}
      {error && <ErrorMessage message={error} />}
      <div className="py-2 border-bottom mb-3">
        <div className="container d-flex flex-wrap justify-content-center">
          <nav aria-label="Page navigation example">
            <ul className="pagination">
              {prevPage && (
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
              {nextPage && (
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
                    <button
                      className="page-link"
                      onClick={() => setPage(lastPage)}
                    >
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
        </div>
      </div>
    </MainPage>
  );
}
