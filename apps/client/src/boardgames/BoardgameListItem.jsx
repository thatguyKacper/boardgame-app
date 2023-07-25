import { Link } from 'react-router-dom';
import useSearchStore from '../searchStore';
import { isAuthenticated } from '../auth/auth-helper';
import AddTo from '../components/AddTo';

export default function BoardgameListItem({ boardgame }) {
  const session = isAuthenticated();
  const { searchCategory, searchText } = useSearchStore();

  return (
    <tr>
      <td>
        <Link to={`/boardgames/${boardgame.id}`}>{boardgame.id}</Link>
      </td>
      <td>
        <Link to={`/boardgames/${boardgame.id}`}>{boardgame.name}</Link>
      </td>
      {searchText && !session && <td>{boardgame[searchCategory]}</td>}
      {searchText && session && (
        <>
          <td>{boardgame[searchCategory]}</td>
          <td>
            <AddTo gameId={boardgame.id} />
          </td>
        </>
      )}
      {!searchText && session && (
        <>
          <td>{boardgame.minplayers}</td>
          <td>{boardgame.maxplayers}</td>
          <td>{boardgame.playingtime}</td>
          <td>{boardgame.category}</td>
          <td>
            <AddTo gameId={boardgame.id} />
          </td>
        </>
      )}
      {!searchText && !session && (
        <>
          <td>{boardgame.minplayers}</td>
          <td>{boardgame.maxplayers}</td>
          <td>{boardgame.playingtime}</td>
          <td>{boardgame.category}</td>
        </>
      )}
    </tr>
  );
}
