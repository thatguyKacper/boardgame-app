import { useState, useEffect } from 'react';
import Boardgame from './Boardgame';

export default function Boardgames() {
  const [games, setGames] = useState([]);

  useEffect(() => {
    const read = async () => {
      try {
        const response = await fetch('/api/boardgames/');
        return response.json();
      } catch (err) {
        console.log(err);
      }
    };

    read().then((data) => {
      setGames(data);
    });
  }, []);

  return (
    <table>
      <tbody>
        <tr>
          <th>ID</th>
          <th>NAME</th>
        </tr>
        {games.length
          ? games.map((game) => (
              <tr key={game.id}>
                <td>{game.id}</td>
                <td>{game.name}</td>
              </tr>
            ))
          : null}
      </tbody>
    </table>
  );
}
