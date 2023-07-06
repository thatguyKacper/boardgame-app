import { useEffect } from 'react';
import './Sign.css';
import MainPage from './MainPage';
import { Link } from 'react-router-dom';

export default function Signin() {
  useEffect(() => {
    const read = async () => {
      try {
        const res = await fetch('/api/auth/signin', {
          method: 'POST',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            email: 'test1@test.com',
            password: 'Pass12345',
          }),
        });

        if (!res.ok) {
          throw new Error('Failed to fetch data');
        }

        const data = await res.json();

        sessionStorage.setItem('jwt', JSON.stringify(data.token));
      } catch (err) {
        console.log(err);
      }
    };

    read();
  }, []);

  return (
    <MainPage>
      <main className="form-sign w-100 m-auto">
        <form>
          <h1 className="h3 mb-3 fw-normal">Sign in</h1>

          <div className="form-floating">
            <input
              type="email"
              className="form-control"
              id="floatingInput"
              placeholder="name@example.com"
            />
            <label htmlFor="floatingInput">Email address</label>
          </div>
          <div className="form-floating">
            <input
              type="password"
              className="form-control"
              id="floatingPassword"
              placeholder="Password"
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
