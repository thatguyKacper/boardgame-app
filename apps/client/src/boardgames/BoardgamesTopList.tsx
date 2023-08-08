import Table from '../components/Table';
import { Boardgame } from '../interfaces/boardgame';
import BoardgameTopListItem from './BoardgamesTopListItem';

export default function BoardgameTopList({ boardgames, title }: { boardgames: Boardgame[], title: string }) {
    const sortedBoardgames = [...boardgames].sort((a, b) =>
    (b.playedbyusersCount || 0) - (a.playedbyusersCount || 0)
  );

  return (
    <Table>
      <thead className='text-center'>
        <tr>
          <th scope="col">Rank</th>
          <th scope="col">Name</th>
          <th scope="col">Number of users {title} this game</th>
        </tr>
      </thead>
      <tbody className='text-center'>
        {sortedBoardgames?.map((boardgame, index) => (
          <BoardgameTopListItem
            boardgame={boardgame}
            key={boardgame.id}
            title={title}
            rank={index + 1}
          />
        ))}
      </tbody>
    </Table>
  );
}
