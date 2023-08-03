import Table from '../components/Table';
import { Boardgame } from '../interfaces/boardgame';
import BoardgameTopListItem from './BoardgamesTopListItem';

export default function BoardgameTopList({ boardgames, title }: { boardgames: Boardgame[], title: string }) {
  return (
    <Table>
      <thead className='text-center'>
        <tr>
          <th scope="col">Rank</th>
          <th scope="col">Name</th>
          <th scope="col">Number of users {title} this game</th>
          {/* {title.includes('score') ? <th scope="col">Total score</th> : null} */}
        </tr>
      </thead>
      <tbody className='text-center'>
        {boardgames?.map((boardgame) => (
          <BoardgameTopListItem
            boardgame={boardgame}
            key={boardgame.id}
            title={title}
          />
        ))}
      </tbody>
    </Table>
  );
}
