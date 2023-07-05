import Nav from './components/Nav';
import Sidebar from './components/Sidebar';
import Users from './pages/Users';
import Boardgames from './pages/Boardgames';
import { Route, Routes } from 'react-router-dom';
import Signup from './pages/Signup';
import Dashboard from './pages/Dashboard';
import Signin from './pages/Signin';
import BoardgamePage from './boardgames/BoardgamePage';
import UserPage from './users/UserPage';
import Profile from './users/Profile';

function App() {
  return (
    <>
      <Nav />
      <div className="container-fluid">
        <div className="row">
          <Sidebar />
          <main className="col-md-9 ms-sm-auto col-lg-10 px-md-4">
            <Routes>
              <Route exact path="/" element={<Dashboard />} />
              <Route path="/signup" element={<Signup />} />
              <Route path="/signin" element={<Signin />} />
              <Route path="/boardgames" element={<Boardgames />} />
              <Route path="/boardgames/:id" element={<BoardgamePage />} />
              <Route path="/users" element={<Users />} />
              <Route path="/users/:id" element={<UserPage />} />
              <Route path="/profile/:id" element={<Profile />} />
            </Routes>
          </main>
        </div>
      </div>
    </>
  );
}

export default App;
