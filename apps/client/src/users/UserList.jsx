import MainPage from '../pages/MainPage';
import UserListItem from './UserListItem';

export default function UserList({ users }) {
  return (
    <MainPage>
      <div className="table-responsive">
        <table className="table table-striped table-sm">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Email</th>
              <th scope="col">Games Played</th>
              <th scope="col">Wishlist</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <UserListItem user={user} key={user.id} />
            ))}
          </tbody>
        </table>
      </div>
    </MainPage>
  );
}
