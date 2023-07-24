import { useState } from 'react';
import MainPage from '../pages/MainPage';
import { useNavigate, useParams } from 'react-router-dom';
import SuccessMessage from '../components/Success';
import ErrorMessage from '../components/Error';
import { clearSession, isAuthenticated } from '../auth/auth-helper';
import { useMutation } from '@tanstack/react-query';

export default function Profile() {
  const [password, setPassword] = useState('');
  const [retypedPassword, setRetypedPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const { id } = useParams();
  const { token } = isAuthenticated();
  const navigate = useNavigate();

  const handleChangePassword = (e) => {
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

  const { mutate } = useMutation({
    mutationFn: async () => {
      if (!token) {
        return;
      }

      await fetch(`/api/profile/${id}`, {
        method: 'DELETE',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + token,
        },
      });
    },
    onSuccess: () => {
      clearSession();
      navigate('/', { replace: true });
    },
    onError: (err) => {
      throw new Error('Could not delete account!');
    },
  });

  return (
    <MainPage>
      {error && <ErrorMessage message={error} />}
      {success && <SuccessMessage message={success} />}
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
      <form onSubmit={() => mutate()}>
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
