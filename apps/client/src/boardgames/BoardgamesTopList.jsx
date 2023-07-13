import { useSearchParams } from 'react-router-dom';
import BoardgameTopListItem from './BoardgamesTopListItem';

export default function BoardgameTopList({ games, title }) {
  console.log();
  return (
    <div className="table-responsive">
      <table className="table table-striped table-sm">
        <thead>
          <tr>
            <th scope="col">Rank</th>
            <th scope="col">Name</th>
            <th scope="col">Number of users {title} this game</th>
            {title.includes('score') ? <th scope="col">Total score</th> : null}
          </tr>
        </thead>
        <tbody>
          {games.map((game) => (
            <BoardgameTopListItem game={game} key={game.id} title={title} />
          ))}
        </tbody>
      </table>
    </div>
  );
}
