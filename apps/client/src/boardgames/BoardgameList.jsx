import { isAuthenticated } from '../auth/auth-helper';
import { capitalizeFirstLetter } from '../helpers/string-helper';
import useSearchStore from '../searchStore';
import BoardgameListItem from './BoardgameListItem';

export default function BoardgameList({ boardgames }) {
  const session = isAuthenticated();
  const { searchCategory } = useSearchStore();

  return (
    <div className="table">
      <table className="table table-striped table-sm table-hover">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Name</th>
            {searchCategory && !session && (
              <th scope="col">{capitalizeFirstLetter(searchCategory)}</th>
            )}
            {searchCategory && session && (
              <>
                <th scope="col">{capitalizeFirstLetter(searchCategory)}</th>
                <th scope="col">Actions</th>
              </>
            )}
            {!searchCategory && session && (
              <>
                <th scope="col">Min Players</th>
                <th scope="col">Max Players</th>
                <th scope="col">Playing time</th>
                <th scope="col">Category</th>
                <th scope="col">Actions</th>
              </>
            )}
            {!searchCategory && !session && (
              <>
                <th scope="col">Min Players</th>
                <th scope="col">Max Players</th>
                <th scope="col">Playing time</th>
                <th scope="col">Category</th>
              </>
            )}
          </tr>
        </thead>
        <tbody>
          {boardgames.map((boardgame) => (
            <BoardgameListItem boardgame={boardgame} key={boardgame.id} />
          ))}
        </tbody>
      </table>
    </div>
  );
}
