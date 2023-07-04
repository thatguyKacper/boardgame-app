import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

export default function Boardgames() {
  const [games, setGames] = useState([]);

  useEffect(() => {
    const read = async () => {
      try {
        const response = await fetch('/api/boardgames');
        return response.json();
      } catch (err) {
        console.log(err);
      }
    };

    read().then((res) => {
      setGames(res.data);
    });
  }, []);

  return (
    <>
      <h2>Boardgames</h2>
      <div className="table-responsive">
        <table className="table table-striped table-sm">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Name</th>
              {/* <th scope="col">Designer</th> */}
              {/* <th scope="col">Artist</th> */}
              {/* <th scope="col">Year</th> */}
              <th scope="col">Min Players</th>
              <th scope="col">Max Players</th>
              <th scope="col">Min Age</th>
              <th scope="col">Playing time</th>
              {/* <th scope="col">Publisher</th> */}
              <th scope="col">Category</th>
              {/* <th scope="col">Mechanic</th> */}
              {/* <th scope="col">Url</th> */}
            </tr>
          </thead>
          <tbody>
            {games.length
              ? games.map((game) => (
                  <tr key={game.id}>
                    <td>
                      <Link to={`/boardgames/${game.id}`}>{game.id}</Link>
                    </td>
                    <td>
                      <Link to={`/boardgames/${game.id}`}>{game.name}</Link>
                    </td>
                    {/* <td>{game.designer}</td> */}
                    {/* <td>{game.artist}</td> */}
                    {/* <td>{game.yearpublished}</td> */}
                    <td>{game.minplayers}</td>
                    <td>{game.maxplayers}</td>
                    <td>{game.minage}</td>
                    <td>{game.playingtime}</td>
                    <td>{game.category}</td>
                    {/* <td>{game.mechanic}</td> */}
                    {/* <td>{game.bggurl}</td> */}
                  </tr>
                ))
              : null}
          </tbody>
        </table>
      </div>
    </>
  );
}
