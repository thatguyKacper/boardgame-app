import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import MainPage from '../pages/MainPage';

export default function User() {
  const { id } = useParams();
  const [user, setUser] = useState([]);

  // TODO react query

  useEffect(() => {
    const read = async () => {
      try {
        const response = await fetch(`/api/users/${id}`);
        return response.json();
      } catch (err) {
        console.log(err);
      }
    };

    read().then((data) => {
      setUser(data);
    });
  }, [id]);

  return (
    <MainPage>
      <h1 className="visually-hidden">{user.id}</h1>

      <div className="px-4 py-5 my-5 text-center">
        <h1 className="display-5 fw-bold mb-5">{user.email}</h1>
        <div className="col-lg-6 mx-auto">
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
    </MainPage>
  );
}
