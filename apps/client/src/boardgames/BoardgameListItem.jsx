import { Link } from 'react-router-dom';
import useSearchStore from '../searchStore';

export default function BoardgameListItem({ boardgame }) {
  const { searchCategory, searchText } = useSearchStore();

  return (
    <tr>
      <td>
        <Link to={`/boardgames/${boardgame.id}`}>{boardgame.id}</Link>
      </td>
      <td>
        <Link to={`/boardgames/${boardgame.id}`}>{boardgame.name}</Link>
      </td>
      {searchText ? (
        <td>{boardgame[searchCategory]}</td>
      ) : (
        <>
          <td>{boardgame.minplayers}</td>
          <td>{boardgame.maxplayers}</td>
          <td>{boardgame.minage}</td>
          <td>{boardgame.playingtime}</td>
          <td>{boardgame.category}</td>
        </>
      )}
    </tr>
  );
}
