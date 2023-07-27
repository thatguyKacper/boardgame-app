import { Link } from 'react-router-dom';

export default function BoardgameTopListItem({ boardgame, title }) {
  return (
    <tr>
      <td>
        <Link to={`/boardgames/${boardgame.id}`}>{boardgame.id}</Link>
      </td>
      <td>
        <Link to={`/boardgames/${boardgame.id}`}>{boardgame.name}</Link>
      </td>
      {title.includes('played') ? (
        <td>{boardgame.playedbyusersCount}</td>
      ) : (
        <td>{boardgame.userswanttoplayCount}</td>
      )}
    </tr>
  );
}
