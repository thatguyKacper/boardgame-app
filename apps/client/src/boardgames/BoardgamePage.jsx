import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import MainPage from '../pages/MainPage';
import Loader from '../components/Loader';
import toast from 'react-hot-toast';
import AddTo from '../components/AddTo';
import { isAuthenticated } from '../auth/auth-helper';

export default function BoardgamePage() {
  const session = isAuthenticated();
  const { id } = useParams();
  const [boardgame, setGame] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  // TODO react query

  useEffect(() => {
    const read = async () => {
      setIsLoading(true);
      try {
        const res = await fetch(`/api/boardgames/${id}`);

        if (!res.ok) {
          throw new Error('Failed to fetch data');
        }

        const data = await res.json();

        setGame(data);
      } catch (err) {
        console.log(err.message);
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    read();
  }, [id]);

  return (
    <MainPage>
      {isLoading && <Loader />}
      {error && toast.error('Could not fetch boardgames')}
      {!isLoading && (
        <>
          <h1 className="visually-hidden">{boardgame.id}</h1>
          <div className="px-4 py-5 my-5 text-center">
            <h1 className="display-5 fw-bold mb-5">{boardgame.name}</h1>
            <div className="table-responsive">
              <div className="container text-center px-0">
                <h6 className="display-6">Details</h6>
                {session ? (
                  <div className="float-end">
                    <AddTo />
                  </div>
                ) : null}
              </div>
              <table className="table table-striped table-sm">
                <tbody>
                  <tr>
                    <td>Name</td>
                    <td>{boardgame.name}</td>
                  </tr>
                  <tr>
                    <td>Designer</td>
                    <td>{boardgame.designer}</td>
                  </tr>
                  <tr>
                    <td>Artist</td>
                    <td>{boardgame.artist}</td>
                  </tr>
                  <tr>
                    <td>Year</td>
                    <td>{boardgame.yearpublished}</td>
                  </tr>
                  <tr>
                    <td>Min Players</td>
                    <td>{boardgame.minplayers}</td>
                  </tr>
                  <tr>
                    <td>Max Players</td>
                    <td>{boardgame.maxplayers}</td>
                  </tr>
                  <tr>
                    <td>Min Age</td>
                    <td>{boardgame.minage}</td>
                  </tr>
                  <tr>
                    <td>Playing time</td>
                    <td>{boardgame.playingtime}</td>
                  </tr>
                  <tr>
                    <td>Publisher</td>
                    <td>{boardgame.publisher}</td>
                  </tr>
                  <tr>
                    <td>Category</td>
                    <td>{boardgame.category}</td>
                  </tr>
                  <tr>
                    <td>Mechanic</td>
                    <td>{boardgame.mechanic}</td>
                  </tr>
                  <tr>
                    <td>Url</td>
                    <td>
                      <Link to={`${boardgame.bggurl}`}>{boardgame.bggurl}</Link>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            {boardgame.playedbyusersCount ? (
              <>
                <h6 className="display-6">Played by</h6>
                <div className="table-responsive">
                  <table className="table table-striped table-sm">
                    <thead>
                      <tr>
                        <th scope="col">#</th>
                        <th scope="col">User</th>
                      </tr>
                    </thead>
                    <tbody>
                      {boardgame.playedbyusers.map((user) => (
                        <tr key={boardgame.id}>
                          <td>
                            <Link to={`/users/${user.id}`}>{user.id}</Link>
                          </td>
                          <td>
                            <Link to={`/users/${user.id}`}>{user.email}</Link>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </>
            ) : null}
            {boardgame.userswanttoplayCount ? (
              <>
                <h6 className="display-6">On wishlist</h6>
                <div className="table-responsive">
                  <table className="table table-striped table-sm">
                    <thead>
                      <tr>
                        <th scope="col">#</th>
                        <th scope="col">User</th>
                      </tr>
                    </thead>
                    <tbody>
                      {boardgame.userswanttoplay.map((user) => (
                        <tr key={boardgame.id}>
                          <td>
                            <Link to={`/users/${user.id}`}>{user.id}</Link>
                          </td>
                          <td>
                            <Link to={`/users/${user.id}`}>{user.email}</Link>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </>
            ) : null}
          </div>
        </>
      )}
    </MainPage>
  );
}
