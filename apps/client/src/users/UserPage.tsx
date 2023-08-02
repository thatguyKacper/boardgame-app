import { Link, useParams } from 'react-router-dom';
import MainPage from '../pages/MainPage';
import useFetchUser from '../hooks/useFetchUser';
import Loader from '../components/Loader';
import toast from 'react-hot-toast';

export default function UserPage() {
  const { id } = useParams();

  const { isLoading, isSuccess, isError, data: {data: user} = {}} = useFetchUser(id);  

  return (
    <MainPage>
      {isLoading && <Loader />}
      {isError && toast.error('Could not fetch user')}
      {isSuccess && user && (
        <>
          <h1 className="visually-hidden">{user.id}</h1>

          <div className="px-4 py-5 my-5 text-center">
            <h1 className="display-5 fw-bold mb-5">{user.email}</h1>
            <div className="col-lg-6 mx-auto">
              <h6 className="display-6">Scored Games:</h6>
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
                      {user.score?.map((boardgame) => (
                        <tr key={boardgame.boardgameId}>
                          <td>
                            <Link to={`/boardgames/${boardgame.boardgameId}`}>
                              {boardgame.boardgameId}
                            </Link>
                          </td>
                          <td>{boardgame.score}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ) : (
                '0'
              )}
              <h6 className="display-6">Played Games:</h6>
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
                      {user.playedboardgames?.map((boardgame) => (
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
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ) : (
                '0'
              )}
            </div>
            <div className="col-lg-6 mx-auto">
              <h6 className="display-6 ">Wishlist:</h6>
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
                      {user.wanttoplayboardgames?.map((boardgame) => (
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
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ) : (
                '0'
              )}
            </div>
          </div>
        </>
      )}
    </MainPage>
  );
}
