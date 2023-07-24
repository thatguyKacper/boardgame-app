import useSearchStore from '../searchStore';
import BoardgameListItem from './BoardgameListItem';

export default function BoardgameList({ boardgames }) {
  function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  const { searchCategory } = useSearchStore();

  return (
    <div className="table">
      <table className="table table-striped table-sm">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Name</th>
            {searchCategory ? (
              <th scope="col">{capitalizeFirstLetter(searchCategory)}</th>
            ) : (
              <>
                <th scope="col">Min Players</th>
                <th scope="col">Max Players</th>
                <th scope="col">Min Age</th>
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
