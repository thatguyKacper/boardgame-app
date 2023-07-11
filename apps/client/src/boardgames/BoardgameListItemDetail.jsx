import { Link } from 'react-router-dom';

export default function BoardgameListItemDetail({ game }) {
  return (
    <tr>
      <td>
        <Link to={`/boardgames/${game.id}`}>{game.id}</Link>
      </td>
      <td>
        <Link to={`/boardgames/${game.id}`}>{game.name}</Link>
      </td>
      <td>{game.designer}</td>
      <td>{game.artist}</td>
      <td>{game.yearpublished}</td>
      <td>{game.minplayers}</td>
      <td>{game.maxplayers}</td>
      <td>{game.minage}</td>
      <td>{game.playingtime}</td>
      <td>{game.publisher}</td>
      <td>{game.category}</td>
      <td>{game.mechanic}</td>
    </tr>
  );
}
