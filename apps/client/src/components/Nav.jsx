import { Link, NavLink, useNavigate } from 'react-router-dom';
import { clearSession, isAuthenticated } from '../auth/auth-helper';
import useSearchStore from '../searchStore';
import { useQuery } from '@tanstack/react-query';
import { getRandom } from '../boardgames/api-boardgames';

export default function Nav() {
  const session = isAuthenticated();
  const navigate = useNavigate();
  const {
    handleSetPage,
    handleSearchCategory,
    handleSearchText,
    handleSortBy,
    handleSortOrder,
  } = useSearchStore();

  const handleLogout = () => {
    clearSession();
    navigate(0);
  };

  const handleClick = () => {
    handleSetPage(1);
    handleSearchCategory('');
    handleSearchText('');
    handleSortBy('');
    handleSortOrder('');
  };

  // TO DO fix double request (from this function and boardgame page)
  const handleRandom = async () => {
    getRandom().then((data) => navigate(`/boardgames/${data.id}`));
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
                <div className="btn-group">
                  <NavLink
                    className="nav-link"
                    to="/boardgames"
                    onClick={handleClick}
                  >
                    Boardgames
                  </NavLink>
                  <button
                    type="button"
                    className="btn dropdown-toggle dropdown-toggle-split nav-link"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                    <span className="visually-hidden">Toggle Dropdown</span>
                  </button>
                  <ul className="dropdown-menu dropdown-menu-dark">
                    <li>
                      <Link className="dropdown-item" onClick={handleRandom}>
                        Random Boardgame
                      </Link>
                    </li>
                  </ul>
                </div>
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
