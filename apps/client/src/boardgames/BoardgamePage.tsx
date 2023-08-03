import { useParams, Link } from 'react-router-dom';
import MainPage from '../pages/MainPage';
import Loader from '../components/Loader';
import toast from 'react-hot-toast';
import AddTo from '../components/AddTo';
import { isAuthenticated } from '../auth/auth-helper';
import useFetchBoardgame from '../hooks/useFetchBoardgame';
import Score from '../components/Score';
import { Boardgame } from '../interfaces/boardgame';
import Table from '../components/Table';

export default function BoardgamePage() {
  const session = isAuthenticated();
  const { id } = useParams<{ id: string }>();

  if (!id) {
    return;
  }

  const {
    isLoading,
    isSuccess,
    isError,
    data: boardgame = {} as Boardgame,
  } = useFetchBoardgame(parseInt(id));

  return (
    <MainPage>
      {isLoading && <Loader />}
      {isError && toast.error('Could not fetch boardgame')}
      {isSuccess && boardgame && (
        <>
          <h1 className="display-5 fw-bold mb-5 text-center">{boardgame.name}</h1>
          {session ? <Score boardgameId={boardgame.id} /> : null}
          <div className="container px-0">
            <h6 className="display-6 mt-5">Details</h6>
            {session ? (
              <div className="float-end">
                <AddTo id={boardgame.id} />
              </div>
            ) : null}
          </div>
          <Table>
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
          </Table>
          {boardgame.usersscoredCount ? (
            <>
              <h6 className="display-6">Scored by</h6>
              <Table>
                <thead>
                  <tr>
                    <th scope="col">#</th>
                    <th scope="col">User</th>
                    <th scope="col">Score</th>
                  </tr>
                </thead>
                <tbody>
                  {boardgame.score?.map((user, i) => (
                    <tr key={i + 1}>
                      <td>{user.boardgameId}</td>
                      <td>
                        <Link to={`/users/${user.userId}`}>
                          {user.userId}
                        </Link>
                      </td>
                      <td>{user.score}</td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </>
          ) : null}
          {boardgame.playedbyusersCount ? (
            <>
              <h6 className="display-6">Played by</h6>
              <Table>
                <thead>
                  <tr>
                    <th scope="col">#</th>
                    <th scope="col">User</th>
                  </tr>
                </thead>
                <tbody>
                  {boardgame.playedbyusers?.map((user, i) => (
                    <tr key={user.userId}>
                      <td>{i + 1}</td>
                      <td>
                        <Link to={`/users/${user.userId}`}>{user.userId}</Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </>
          ) : null}
          {boardgame.userswanttoplayCount ? (
            <>
              <h6 className="display-6">On wishlist</h6>
              <Table>
                <thead>
                  <tr>
                    <th scope="col">#</th>
                    <th scope="col">User</th>
                  </tr>
                </thead>
                <tbody>
                  {boardgame.userswanttoplay?.map((user, i) => (
                    <tr key={user.userId}>
                      <td>{i + 1}</td>
                      <td>
                        <Link to={`/users/${user.userId}`}>{user.userId}</Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </>
          ) : null}
        </>
      )}
    </MainPage>
  );
}
