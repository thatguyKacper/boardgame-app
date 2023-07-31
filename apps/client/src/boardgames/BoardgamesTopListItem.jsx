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
      {title.includes('played') && <td>{boardgame.playedbyusersCount}</td>}
      {title.includes('wishlist') && <td>{boardgame.userswanttoplayCount}</td>}
      {title.includes('score') && <td>{boardgame.usersscoredCount}</td>}
    </tr>
  );
}
