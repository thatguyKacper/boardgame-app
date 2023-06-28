import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

export default function Users() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const read = async () => {
      try {
        const response = await fetch('/api/users');
        return response.json();
      } catch (err) {
        console.log(err);
      }
    };

    read().then((data) => {
      setUsers(data);
    });
  }, []);

  return (
    <>
      <h2>Users</h2>
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
            {users.length
              ? users.map((user) => (
                  <tr key={user.id}>
                    <td>
                      <Link to={`/users/${user.id}`}>{user.id}</Link>
                    </td>
                    <td>
                      <Link to={`/users/${user.id}`}>{user.email}</Link>
                    </td>
                    <td>{user.wanttoplayboardgames}</td>
                    <td>{user.userplayedboardgames}</td>
                  </tr>
                ))
              : null}
          </tbody>
        </table>
      </div>
    </>
  );
}
