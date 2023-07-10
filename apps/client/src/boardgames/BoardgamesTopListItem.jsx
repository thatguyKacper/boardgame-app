import { Link } from 'react-router-dom';

export default function BoardgameTopListItem({ game, title }) {
  return (
    <tr>
      <td>
        <Link to={`/boardgames/${game.id}`}>{game.id}</Link>
      </td>
      <td>
        <Link to={`/boardgames/${game.id}`}>{game.name}</Link>
      </td>
      {title.includes('played') ? (
        <td>{game.playedbyusersCount}</td>
      ) : (
        <td>{game.userswanttoplayCount}</td>
      )}
    </tr>
  );
}
