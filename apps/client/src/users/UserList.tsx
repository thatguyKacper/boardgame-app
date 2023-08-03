import Table from '../components/Table';
import { User } from '../interfaces/user';
import UserListItem from './UserListItem';

export default function UserList({ users }: { users?: User[] }) {
  return (
    <Table>
      <thead>
        <tr>
          <th scope="col">#</th>
          <th scope="col">Email</th>
          <th scope="col">Games Played</th>
          <th scope="col">Wishlist</th>
          <th scope="col">Scored Games</th>
        </tr>
      </thead>
      <tbody>
        {users?.map((user) => (
          <UserListItem user={user} key={user.id} />
        ))}
      </tbody>
    </Table>
  );
}
