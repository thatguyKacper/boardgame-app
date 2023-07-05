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
      <td>{user.wanttoplayboardgames}</td>
      <td>{user.userplayedboardgames}</td>
    </tr>
  );
}
