import { Link, useParams } from 'react-router-dom';
import MainLayout from '../components/MainLayout';
import useFetchUser from '../hooks/useFetchUser';
import Loader from '../components/Loader';
import toast from 'react-hot-toast';
import { User } from '../interfaces/user';
import Table from '../components/Table';
import Score from '../components/Score';

export default function UserPage() {
  const { id } = useParams<{ id: string }>();

  if (!id) {
    return;
  }

  const { isLoading, isSuccess, isError, data: user = {} as User } = useFetchUser(parseInt(id));

  return (
    <MainLayout>
      {isLoading && <Loader />}
      {isError && toast.error('Could not fetch user')}
      {isSuccess && user && (
        <>
          <h1 className="display-5 fw-bold mb-5 text-center">{user.email}</h1>
          <h2>Scored Games:</h2>
          {user.usersscoredCount ? (
            <Table>
              <thead className='text-center'>
                <tr>
                  <th scope="col">#</th>
                  <th scope="col">Score</th>
                </tr>
              </thead>
              <tbody className='text-center'>
                {user.score?.map((boardgame) => (
                  <tr key={boardgame.boardgameId}>
                    <td>
                      <Link to={`/boardgames/${boardgame.boardgameId}`}>
                        {boardgame.boardgameId}
                      </Link>
                    </td>
                    <td>{boardgame.score}</td>
                    <td><Score boardgameId={boardgame.boardgameId} stars={boardgame.score}/></td>
                  </tr>
                ))}
              </tbody>
            </Table>
          ) : (
            '0'
          )}
          <h2>Played Games:</h2>
          {user.playedboardgamesCount ? (
            <Table>
              <thead className='text-center'>
                <tr>
                  <th scope="col">#</th>
                  <th scope="col">Name</th>
                </tr>
              </thead>
              <tbody className='text-center'>
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
            </Table>
          ) : (
            '0'
          )}
          <h2>Wishlist:</h2>
          {user.wanttoplayboardgamesCount ? (
            <Table>
              <thead className='text-center'>
                <tr>
                  <th scope="col">#</th>
                  <th scope="col">Name</th>
                </tr>
              </thead>
              <tbody className='text-center'>
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
            </Table>
          ) : (
            '0'
          )}
        </>
      )}
    </MainLayout>
  );
}
