import { Link } from 'react-router-dom';

export default function UserListItem({ user }) {
  // console.log(user);
  return (
    <tr>
      <td>
        <Link to={`/users/${user.id}`}>{user.id}</Link>
      </td>
      <td>
        <Link to={`/users/${user.id}`}>{user.email}</Link>
      </td>
      {/* <td>{user.playedboardgames.length ? user.playedboardgames : '0'}</td>
      <td>
        {user.wanttoplayboardgames.length ? user.wanttoplayboardgames : '0'}
      </td> */}
    </tr>
  );
}
