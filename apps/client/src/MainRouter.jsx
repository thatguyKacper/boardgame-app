import Nav from './components/Nav';
import Sidebar from './components/Sidebar';
import Users from './users/Users';
import Boardgames from './boardgames/Boardgames';
import { Route, Routes } from 'react-router-dom';
import Signup from './pages/Signup';
import Signin from './pages/Signin';
import BoardgamePage from './boardgames/BoardgamePage';
import UserPage from './users/UserPage';
import Profile from './users/Profile';
import PrivateRoute from './auth/PrivateRoute';
import MainPage from './pages/MainPage';

function App() {
  return (
    <>
      <Routes>
        <Route exact path="/" element={<MainPage />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/signin" element={<Signin />} />
        <Route path="/boardgames" element={<Boardgames />} />
        <Route path="/boardgames/:id" element={<BoardgamePage />} />
        <Route path="/users" element={<Users />} />
        <Route path="/users/:id" element={<UserPage />} />
        <Route
          path="/profile/:id"
          element={
            <PrivateRoute>
              <Profile />
            </PrivateRoute>
          }
        />
      </Routes>
    </>
  );
}

export default App;
