import { Link } from 'react-router-dom';
import useSearchStore from '../searchStore';
import { isAuthenticated } from '../auth/auth-helper';
import AddTo from '../components/AddTo';
import { Boardgame } from '../interfaces/boardgame';

// type guard
function hasProperty(obj: object, key: string): key is keyof typeof obj {
  return key in obj;
}

export default function BoardgameListItem({ boardgame }: {boardgame: Boardgame}) {
  const session = isAuthenticated();
  const { searchCategory, searchText } = useSearchStore();

  if (!boardgame) {
    return null;
  }

  return (
    <tr>
      <td>
        <Link to={`/boardgames/${boardgame.id}`}>{boardgame.id}</Link>
      </td>
      <td>
        <Link to={`/boardgames/${boardgame.id}`}>{boardgame.name}</Link>
      </td>
      {searchText && !session && hasProperty(boardgame, searchCategory) && (
        <td>{boardgame[searchCategory]}</td>
      )}
      {searchText && session && hasProperty(boardgame, searchCategory) && (
        <>
          <td>{boardgame[searchCategory]}</td>
          <td>
            <AddTo id={boardgame.id} />
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
            <AddTo id={boardgame.id} />
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
