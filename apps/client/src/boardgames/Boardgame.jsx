import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';

export default function Boardgame() {
  const { id } = useParams();
  const [game, setUser] = useState([]);

  useEffect(() => {
    const read = async () => {
      try {
        const response = await fetch(`/api/boardgames/${id}`);
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
    <main>
      <h1 className="visually-hidden">{game.id}</h1>

      {console.log(game.name)}

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
    </main>
  );
}
