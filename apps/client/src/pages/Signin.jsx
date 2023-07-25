import { useState } from 'react';
import './Sign.css';
import MainPage from './MainPage';
import { Link } from 'react-router-dom';
import Loader from '../components/Loader';
import useSignin from '../hooks/useSignin';

export default function Signin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const { signin, isLoading } = useSignin();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      return;
    }

    signin({ email, password });
  };

  return (
    <MainPage>
      {isLoading && <Loader />}
      <main className="form-sign w-100 m-auto">
        <form onSubmit={handleSubmit}>
          <h1 className="h3 mb-3 fw-normal">Sign in</h1>

          <div className="form-floating">
            <input
              type="email"
              className="form-control"
              id="floatingInput"
              placeholder="name@example.com"
              onChange={(e) => setEmail(e.target.value)}
            />
            <label htmlFor="floatingInput">Email address</label>
          </div>
          <div className="form-floating">
            <input
              type="password"
              className="form-control"
              id="floatingPassword"
              placeholder="Password"
              onChange={(e) => setPassword(e.target.value)}
            />
            <label htmlFor="floatingPassword">Password</label>
          </div>
          <div className="checkbox mb-3">
            <Link
              to="/signup"
              className="icon-link d-inline-flex align-items-center"
            >
              Don't have account?
            </Link>
          </div>
          <button className="w-100 btn btn-lg btn-primary" type="submit">
            Sign in
          </button>
        </form>
      </main>
    </MainPage>
  );
}
