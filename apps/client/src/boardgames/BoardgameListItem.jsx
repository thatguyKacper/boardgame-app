import { Link } from 'react-router-dom';

export default function BoardgameListItem({ game }) {
  return (
    <tr>
      <td>
        <Link to={`/boardgames/${game.id}`}>{game.id}</Link>
      </td>
      <td>
        <Link to={`/boardgames/${game.id}`}>{game.name}</Link>
      </td>
      <td>{game.minplayers}</td>
      <td>{game.maxplayers}</td>
      <td>{game.minage}</td>
      <td>{game.playingtime}</td>
      <td>{game.category}</td>
    </tr>
  );
}
