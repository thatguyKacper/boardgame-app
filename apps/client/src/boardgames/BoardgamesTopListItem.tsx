import { Link } from 'react-router-dom';
import { Boardgame } from '../interfaces/boardgame';

export default function BoardgameTopListItem({ boardgame, title }: {boardgame: Boardgame, title: string}) {
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
