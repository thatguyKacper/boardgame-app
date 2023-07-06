import BoardgameListItem from './BoardgameListItem';

export default function BoardgameList({ games }) {
  return (
    <div className="table-responsive">
      <table className="table table-striped table-sm">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Name</th>
            <th scope="col">Min Players</th>
            <th scope="col">Max Players</th>
            <th scope="col">Min Age</th>
            <th scope="col">Playing time</th>
            <th scope="col">Category</th>
          </tr>
        </thead>
        <tbody>
          {games.map((game) => (
            <BoardgameListItem game={game} key={game.id} />
          ))}
        </tbody>
      </table>
    </div>
  );
}
