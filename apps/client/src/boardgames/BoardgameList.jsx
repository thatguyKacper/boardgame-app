import BoardgameListItem from './BoardgameListItem';

export default function BoardgameList({ games, search }) {
  function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  return (
    <div className="table">
      <table className="table table-striped table-sm">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Name</th>
            {search ? (
              <th scope="col">{capitalizeFirstLetter(search)}</th>
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
          {games.map((game) => (
            <BoardgameListItem game={game} key={game.id} search={search} />
          ))}
        </tbody>
      </table>
    </div>
  );
}
