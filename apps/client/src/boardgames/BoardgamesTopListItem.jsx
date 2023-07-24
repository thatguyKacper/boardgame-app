import { Link } from 'react-router-dom';

export default function BoardgameTopListItem({ boardgame, title }) {
  return (
    <tr>
      <td>
        <Link to={`/boardboardgames/${boardgame.id}`}>{boardgame.id}</Link>
      </td>
      <td>
        <Link to={`/boardboardgames/${boardgame.id}`}>{boardgame.name}</Link>
      </td>
      {title.includes('played') ? (
        <td>{boardgame.playedbyusersCount}</td>
      ) : (
        <td>{boardgame.userswanttoplayCount}</td>
      )}
    </tr>
  );
}
