import { Link } from 'react-router-dom';
import { Boardgame } from '../interfaces/boardgame';

export default function BoardgameTopListItem({ boardgame, title, rank }: { boardgame: Boardgame, title: string, rank: number }) {
  return (
    <tr>
      <td>
        {rank}
      </td>
      <td>
        <Link to={`/boardgames/${boardgame.id}`}>{boardgame.name}</Link>
      </td>
      {title.includes('played') && <td className='w-50'>{boardgame.playedbyusersCount}</td>}
      {title.includes('wishlist') && <td className='w-50'>{boardgame.userswanttoplayCount}</td>}
      {title.includes('score') && <td className='w-50'>{boardgame.usersscoredCount}</td>}
    </tr>
  );
}
