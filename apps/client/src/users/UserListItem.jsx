import { Link } from 'react-router-dom';

export default function UserListItem({ user }) {
  return (
    <tr>
      <td>
        <Link to={`/users/${user.id}`}>{user.id}</Link>
      </td>
      <td>
        <Link to={`/users/${user.id}`}>{user.email}</Link>
      </td>
      <td>{user.playedboardgamesCount ? user.playedboardgamesCount : '0'}</td>
      <td>
        {user.wanttoplayboardgamesCount ? user.wanttoplayboardgamesCount : '0'}
      </td>
      <td>{user.usersscoredCount ? user.usersscoredCount : '0'}</td>
    </tr>
  );
}
