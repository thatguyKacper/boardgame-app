import BoardgameListItemDetail from './BoardgameListItemDetail';

export default function BoardgameListDetail({ games }) {
  return (
    <div className="table">
      <table className="table table-striped table-sm">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Name</th>
            <th scope="col">Designer</th>
            <th scope="col">Artist</th>
            <th scope="col">Year published</th>
            <th scope="col">Min players</th>
            <th scope="col">Max players</th>
            <th scope="col">Min age</th>
            <th scope="col">Playing time</th>
            <th scope="col">Publisher</th>
            <th scope="col">Category</th>
            <th scope="col">Mechanic</th>
          </tr>
        </thead>
        <tbody>
          {games.map((game) => (
            <BoardgameListItemDetail game={game} key={game.id} />
          ))}
        </tbody>
      </table>
    </div>
  );
}
