import { FormEvent, useState } from 'react';
import MainLayout from '../components/MainLayout';
import { isAuthenticated } from '../auth/auth-helper';
import useEdit from '../hooks/useEdit';
import useFetchUser from '../hooks/useFetchUser';
import Loader from '../components/Loader';
import toast from 'react-hot-toast';
import Modal from '../components/Modal';
import { Auth } from '../interfaces/auth';
import useDelete from '../hooks/useDelete';

export default function Profile() {
  const [password, setPassword] = useState('');
  const [retypedPassword, setRetypedPassword] = useState('');
  const [isVisible, setIsVisible] = useState(false)
  const session = isAuthenticated();

  if (!session) {
    return
  }

  const { id, token } = session as Auth;

  const { isLoading, isSuccess, isError } = useFetchUser(id);

  const { edit } = useEdit();
  const { remove } = useDelete();

  const handleChangePassword = (e: FormEvent) => {
    e.preventDefault();

    if (!password || !retypedPassword) {
      return;
    }

    edit({ id, token, password, retypedPassword });
  };


  const handleDelete = () => {
    if (!token) {
      return;
    }

    remove({ id, token });
  };

  return (
    <MainLayout>
      {isLoading && <Loader />}
      {isError && toast.error('Could not fetch user')}
      {isSuccess && (
        <>
          <h1 className='pb-4 border-bottom'>Profile</h1>
          <form onSubmit={handleChangePassword} className="mb-3">
            <div className="mb-3">
              <h2 className="pb-2 border-bottom">Change password</h2>
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
            <h2 className="pb-2 border-bottom mb-3">Delete account</h2>
            <button
              type="button"
              className="btn btn-danger"
              onClick={() => setIsVisible(true)}
            >
              Delete
            </button>
            {isVisible &&
              <Modal
                title='Delete Account'
                message='Are you sure you want to delete your account?'
                buttonColor='danger'
                buttonText='Delete'
                onClose={() => setIsVisible(false)}
                onAction={() => handleDelete()}
              />
            }
          </div>
        </>
      )}
    </MainLayout>
  );
}