import { Link } from 'react-router-dom';
import MainPage from '../pages/MainPage';
import useFetchUser from '../hooks/useFetchUser';
import { isAuthenticated } from '../auth/auth-helper';
import Loader from '../components/Loader';
import toast from 'react-hot-toast';
import useRemoveFromPlayed from '../hooks/useRemoveFromAsPlayed';
import useRemoveFromWishlist from '../hooks/useRemoveFromWishlist';
import useRemoveScore from '../hooks/useRemoveScore';
import Score from '../components/Score';

export default function User() {
  const { id, token } = isAuthenticated();

  const { isLoading, isSuccess, isError, data: user = {} } = useFetchUser(id);
  const { removeFromPlayed } = useRemoveFromPlayed();
  const { removeFromWishlist } = useRemoveFromWishlist();
  const { removeScore } = useRemoveScore();

  const handleRemoveFromPlayed = (gameId) => {
    if (!token || !gameId) {
      return;
    }

    removeFromPlayed({ gameId, token });
  };

  const handleRemoveFromWishlist = (gameId) => {
    if (!token || !gameId) {
      return;
    }

    removeFromWishlist({ gameId, token });
  };

  const handleRemoveScore = (gameId) => {
    if (!token || !gameId) {
      return;
    }

    removeScore({ gameId, token });
  };

  return (
    <MainPage>
      {isLoading && <Loader />}
      {isError && toast.error('Could not fetch boardgames')}
      {isSuccess && (
        <>
          <h1 className="pb-4 border-bottom">Dashboard</h1>
          <h2 className="pb-2 border-bottom">Scored Games:</h2>
          {user.usersscoredCount ? (
            <div className="table-responsive">
              <table className="table table-striped table-sm">
                <thead>
                  <tr>
                    <th scope="col">#</th>
                    <th scope="col">Score</th>
                  </tr>
                </thead>
                <tbody>
                  {user.score.map((boardgame, i) => (
                    <tr key={boardgame.boardgameId}>
                      <td>
                        <Link to={`/boardgames/${boardgame.boardgameId}`}>
                          {boardgame.boardgameId}
                        </Link>
                      </td>
                      <td>{boardgame.score}</td>
                      <td>
                        <button
                          type="button"
                          className="btn btn-danger float-end"
                          onClick={() =>
                            handleRemoveScore(boardgame.boardgameId)
                          }
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="16"
                            height="16"
                            fill="currentColor"
                            className="bi bi-x-circle"
                            viewBox="0 0 16 16"
                          >
                            <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z" />
                            <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z" />
                          </svg>
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            '0'
          )}
          <h2 className="pb-2 border-bottom">Played Games:</h2>
          {user.playedboardgamesCount ? (
            <div className="table-responsive">
              <table className="table table-striped table-sm">
                <thead>
                  <tr>
                    <th scope="col">#</th>
                    <th scope="col">Name</th>
                  </tr>
                </thead>
                <tbody>
                  {user.playedboardgames.map((boardgame) => (
                    <tr key={boardgame.id}>
                      <td>
                        <Link to={`/boardgames/${boardgame.id}`}>
                          {boardgame.id}
                        </Link>
                      </td>
                      <td>
                        <Link to={`/boardgames/${boardgame.id}`}>
                          {boardgame.name}
                        </Link>
                      </td>
                      <td>
                        <button
                          type="button"
                          className="btn btn-danger float-end"
                          onClick={() => handleRemoveFromPlayed(boardgame.id)}
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="16"
                            height="16"
                            fill="currentColor"
                            className="bi bi-x-circle"
                            viewBox="0 0 16 16"
                          >
                            <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z" />
                            <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z" />
                          </svg>
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            '0'
          )}
          <h2 className="pb-2 border-bottom">Wishlist:</h2>
          {user.wanttoplayboardgamesCount ? (
            <div className="table-responsive">
              <table className="table table-striped table-sm">
                <thead>
                  <tr>
                    <th scope="col">#</th>
                    <th scope="col">Name</th>
                  </tr>
                </thead>
                <tbody>
                  {user.wanttoplayboardgames.map((boardgame) => (
                    <tr key={boardgame.id}>
                      <td>
                        <Link to={`/boardgames/${boardgame.id}`}>
                          {boardgame.id}
                        </Link>
                      </td>
                      <td>
                        <Link to={`/boardgames/${boardgame.id}`}>
                          {boardgame.name}
                        </Link>
                      </td>
                      <td>
                        <button
                          type="button"
                          className="btn btn-danger float-end"
                          onClick={() => handleRemoveFromWishlist(boardgame.id)}
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="16"
                            height="16"
                            fill="currentColor"
                            className="bi bi-x-circle"
                            viewBox="0 0 16 16"
                          >
                            <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z" />
                            <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z" />
                          </svg>
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            '0'
          )}
        </>
      )}
    </MainPage>
  );
}
