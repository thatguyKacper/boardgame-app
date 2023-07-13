import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import MainPage from '../pages/MainPage';

export default function User() {
  const { id } = useParams();
  const [user, setUser] = useState([]);

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
  }, []);

  return (
    <MainPage>
      <h1 className="visually-hidden">{user.id}</h1>

      <div className="px-4 py-5 my-5 text-center">
        <h1 className="display-5 fw-bold mb-5">{user.email}</h1>
        <div className="col-lg-6 mx-auto">
          <h6 className="display-6">Played Games:</h6>
          <ul className="lead mb-4">
            {user.playedboardgamesCount ? (
              <p className="display-6 fw-bold">{user.playedboardgamesCount}</p>
            ) : (
              <p className="display-6 fw-bold">0</p>
            )}
          </ul>
        </div>
        <div className="col-lg-6 mx-auto">
          <h6 className="display-6 ">Wishlist:</h6>
          <ul className="lead mb-4">
            {user.wanttoplayboardgamesCount ? (
              <p className="display-6 fw-bold">
                {user.wanttoplayboardgamesCount}
              </p>
            ) : (
              <p className="display-6 fw-bold">0</p>
            )}
          </ul>
        </div>
      </div>
    </MainPage>
  );
}
