import { useState } from 'react';
import MainPage from '../pages/MainPage';
import { useParams } from 'react-router-dom';
import SuccessMessage from '../components/Success';
import ErrorMessage from '../components/Error';
import { isAuthenticated } from '../auth/auth-helper';

export default function Profile() {
  const [password, setPassword] = useState('');
  const [retypedPassword, setRetypedPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const { id } = useParams();
  const { token } = isAuthenticated();

  const handleSubmit = (e) => {
    e.preventDefault();

    const edit = async () => {
      try {
        const res = await fetch(`/api/profile/${id}`, {
          method: 'PATCH',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + token,
          },
          body: JSON.stringify({
            password,
            retypedPassword,
          }),
        });

        if (!res.ok) {
          throw new Error('Passwords are not identical!');
        }

        // const data = await res.json();
        setSuccess('Password changed successfully!');
        setPassword('');
        setRetypedPassword('');
      } catch (err) {
        console.log(err.message);
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };
    edit();
  };

  return (
    <MainPage>
      {error && <ErrorMessage message={error} />}
      {success && <SuccessMessage message={success} />}
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
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
    </MainPage>
  );
}
