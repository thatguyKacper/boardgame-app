import { useState } from 'react';
import './Sign.css';
import MainPage from './MainPage';
import { Link, Navigate } from 'react-router-dom';
import Loader from '../components/Loader';
import ErrorMessage from '../components/Error';

export default function Signin() {
  const [email, setEmail] = useState({ email: '' });
  const [password, setPassword] = useState({ password: '' });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();

    const signin = async () => {
      try {
        const res = await fetch('/api/signup', {
          method: 'POST',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            email,
            password,
          }),
        });

        if (!res.ok) {
          throw new Error('Email already in use!');
        }

        const data = await res.json();

        sessionStorage.setItem('jwt', JSON.stringify(data.token));

        setIsAuthenticated(true);
      } catch (err) {
        console.log(err.message);
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };
    signin();
  };

  return (
    <MainPage>
      {isLoading && <Loader />}
      {!isLoading && !error && isAuthenticated && <Navigate to="/" replace />}
      {error && <ErrorMessage message={error} />}
      <main className="form-sign w-100 m-auto">
        <form onSubmit={handleSubmit}>
          <h1 className="h3 mb-3 fw-normal">Sign up</h1>

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
          <button className="w-100 btn btn-lg btn-primary" type="submit">
            Sign in
          </button>
        </form>
      </main>
    </MainPage>
  );
}
