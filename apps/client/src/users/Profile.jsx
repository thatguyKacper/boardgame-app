import { useState } from 'react';
import MainPage from '../pages/MainPage';
import { isAuthenticated } from '../auth/auth-helper';
import useEdit from '../hooks/useEdit';
import useFetchUser from '../hooks/useFetchUser';
import Loader from '../components/Loader';
import toast from 'react-hot-toast';
import Modal from '../components/Modal';

export default function Profile() {
  const [password, setPassword] = useState('');
  const [retypedPassword, setRetypedPassword] = useState('');
  const { token, id } = isAuthenticated();

  const { isLoading, isSuccess, isError, data } = useFetchUser(id);

  const { edit } = useEdit();

  const handleChangePassword = (e) => {
    e.preventDefault();

    if (!password || !retypedPassword) {
      return;
    }

    edit({ id, token, password, retypedPassword });
  };

  return (
    <MainPage>
      {isLoading && <Loader />}
      {isError && toast.error('Could not fetch user')}
      {isSuccess && (
        <>
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
          <div className="mb-3">
            <h4 className="pb-2 border-bottom mb-3">Delete account</h4>
            <button
              type="submit"
              className="btn btn-danger"
              data-bs-toggle="modal"
              data-bs-target="#exampleModal"
            >
              Delete
            </button>
            <Modal
              title={'Delete Account'}
              message={'Are you sure you want to delete your account?'}
              buttonColor={'danger'}
              buttonText={'Delete'}
            />
          </div>
        </>
      )}
    </MainPage>
  );
}
