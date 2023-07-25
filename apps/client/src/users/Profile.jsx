import { useState } from 'react';
import MainPage from '../pages/MainPage';
import { isAuthenticated } from '../auth/auth-helper';
import useEdit from '../hooks/useEdit';
import useDelete from '../hooks/useDelete';

export default function Profile() {
  const [password, setPassword] = useState('');
  const [retypedPassword, setRetypedPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { token, id } = isAuthenticated();

  const { edit } = useEdit();
  const { remove } = useDelete();

  const handleChangePassword = (e) => {
    e.preventDefault();

    if (!password || !retypedPassword) {
      return;
    }

    edit({ id, token, password, retypedPassword });
  };

  const handleDelete = (e) => {
    e.preventDefault();

    if (!token) {
      return;
    }

    remove({ id, token });
  };

  return (
    <MainPage>
      <form onSubmit={handleChangePassword} className="mb-3">
        <div className="mb-3">
          <h4 className="pb-2 border-bottom">Change password</h4>
          <label htmlFor="newPassword" className="form-label">
            New password
          </label>
          <input
            type="password"
            className="form-control"
            id="newPassword"
            aria-describedby="emailHelp"
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="newPasswordRetype" className="form-label">
            Retype new password
          </label>
          <input
            type="password"
            className="form-control"
            id="newPasswordRetype"
            onChange={(e) => setRetypedPassword(e.target.value)}
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>
      <form onSubmit={handleDelete}>
        <div className="mb-3">
          <h4 className="pb-2 border-bottom mb-3">Delete account</h4>
          <button type="submit" className="btn btn-danger">
            Delete
          </button>
        </div>
      </form>
    </MainPage>
  );
}
