import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';

export default function BoardgamePage() {
  const { id } = useParams();
  const [game, setGame] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

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
  }, []);

  function Loader() {
    return (
      <div className="d-flex justify-content-center">
        <div className="spinner-border" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  function ErrorMessage({ message }) {
    return (
      <div className="alert alert-danger" role="alert">
        {message}
      </div>
    );
  }

  return (
    <main>
      {isLoading && <Loader />}
      {!isLoading && !error && (
        <>
          <h1 className="visually-hidden">{game.id}</h1>
          <div className="px-4 py-5 my-5 text-center">
            <h1 className="display-5 fw-bold mb-5">{game.name}</h1>
            <div className="table-responsive">
              <h6 className="display-6">Info</h6>
              <table className="table table-striped table-sm">
                <tbody>
                  <tr>
                    <td>Name</td>
                    <td>{game.name}</td>
                  </tr>
                  <tr>
                    <td>Designer</td>
                    <td>{game.designer}</td>
                  </tr>
                  <tr>
                    <td>Artist</td>
                    <td>{game.artist}</td>
                  </tr>
                  <tr>
                    <td>Year</td>
                    <td>{game.yearpublished}</td>
                  </tr>
                  <tr>
                    <td>Min Players</td>
                    <td>{game.minplayers}</td>
                  </tr>
                  <tr>
                    <td>Max Players</td>
                    <td>{game.maxplayers}</td>
                  </tr>
                  <tr>
                    <td>Min Age</td>
                    <td>{game.minage}</td>
                  </tr>
                  <tr>
                    <td>Playing time</td>
                    <td>{game.playingtime}</td>
                  </tr>
                  <tr>
                    <td>Publisher</td>
                    <td>{game.publisher}</td>
                  </tr>
                  <tr>
                    <td>Category</td>
                    <td>{game.category}</td>
                  </tr>
                  <tr>
                    <td>Mechanic</td>
                    <td>{game.mechanic}</td>
                  </tr>
                  <tr>
                    <td>Url</td>
                    <td>
                      <Link to={`${game.bggurl}`}>{game.bggurl}</Link>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </>
      )}
      {error && <ErrorMessage message={error} />}
    </main>
  );
}
