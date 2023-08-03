import { Boardgame } from '../interfaces/boardgame';
import BoardgameTopListItem from './BoardgamesTopListItem';

export default function BoardgameTopList({ boardgames, title }: {boardgames: Boardgame[], title: string}) {
  return (
    <div className="table-responsive">
      <table className="table table-striped table-sm">
        <thead>
          <tr>
            <th scope="col">Rank</th>
            <th scope="col">Name</th>
            <th scope="col">Number of users {title} this game</th>
            {/* {title.includes('score') ? <th scope="col">Total score</th> : null} */}
          </tr>
        </thead>
        <tbody>
          {boardgames?.map((boardgame) => (
            <BoardgameTopListItem
              boardgame={boardgame}
              key={boardgame.id}
              title={title}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
}
