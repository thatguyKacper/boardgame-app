import MainPage from './MainPage';
import './Sign.css';

export default function Signin() {
  return (
    <MainPage>
      <main className="form-sign w-100 m-auto">
        <form>
          <h1 className="h3 mb-3 fw-normal">Sign up</h1>

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
          <button className="w-100 btn btn-lg btn-primary" type="submit">
            Sign up
          </button>
        </form>
      </main>
    </MainPage>
  );
}
