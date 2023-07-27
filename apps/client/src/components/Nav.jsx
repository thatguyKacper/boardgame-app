import { NavLink, useNavigate } from 'react-router-dom';
import { clearSession, isAuthenticated } from '../auth/auth-helper';
import useSearchStore from '../searchStore';

export default function Nav() {
  const session = isAuthenticated();
  const navigate = useNavigate();
  const { handleSetPage, handleSearchCategory, handleSearchText } =
    useSearchStore();

  const handleLogout = () => {
    clearSession();
    navigate(0);
  };

  const handleClick = () => {
    handleSetPage(1);
    handleSearchCategory('');
    handleSearchText('');
  };

  return (
    <header>
      <nav className="navbar navbar-expand-md navbar-dark fixed-top bg-dark">
        <div className="container">
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarCollapse"
            aria-controls="navbarCollapse"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarCollapse">
            <ul className="navbar-nav me-auto mb-2 mb-md-0">
              <li className="nav-item">
                <NavLink
                  className="nav-link"
                  aria-current="page"
                  to="/"
                  onClick={handleClick}
                >
                  Home
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink
                  className="nav-link"
                  to="/boardgames"
                  onClick={handleClick}
                >
                  Boardgames
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" to="/users" onClick={handleClick}>
                  Users
                </NavLink>
              </li>
              {session ? (
                <>
                  <li className="nav-item">
                    <NavLink
                      className="nav-link"
                      to={`/dashboard`}
                      onClick={handleClick}
                    >
                      Dashboard
                    </NavLink>
                  </li>
                  <li className="nav-item">
                    <NavLink
                      className="nav-link"
                      to={`/profile/${session.id}`}
                      onClick={handleClick}
                    >
                      Profile
                    </NavLink>
                  </li>
                </>
              ) : null}
            </ul>
            <div className="navbar-nav">
              <div className="nav-item text-nowrap">
                {session ? (
                  <button
                    type="button"
                    className="btn btn-outline-light me-2"
                    onClick={handleLogout}
                  >
                    Sign out
                  </button>
                ) : (
                  <button
                    type="button"
                    className="btn btn-outline-light me-2"
                    onClick={() => navigate('/signin')}
                  >
                    Sign in
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
}
