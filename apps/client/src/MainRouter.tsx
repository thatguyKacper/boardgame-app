import Users from './users/Users';
import Boardgames from './boardgames/Boardgames';
import { Route, Routes } from 'react-router-dom';
import Signup from './pages/Signup';
import Signin from './pages/Signin';
import BoardgamePage from './boardgames/BoardgamePage';
import UserPage from './users/UserPage';
import Profile from './users/Profile';
// import PrivateRoute from './auth/PrivateRoute';
import MainPage from './pages/MainPage';
import NotFound from './pages/NotFound';
import BoardgamesTop from './boardgames/BoardgamesTop';
import Dashboard from './pages/Dashboard';
import { Suspense, lazy } from 'react';
import Loader from './components/Loader';

const PrivateRoute = lazy(() => import("./auth/PrivateRoute"));

export default function MainRouter() {
  return (
    <Routes>
      <Route path="/" element={<MainPage />} />
      <Route path="/boardgames" element={<Boardgames />} />
      <Route path="/boardgames/:id" element={<BoardgamePage />} />
      <Route path="/boardgames/lists" element={<BoardgamesTop />} />
      <Route path="/users" element={<Users />} />
      <Route path="/users/:id" element={<UserPage />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/signin" element={<Signin />} />
      <Route
        path="/profile/:id"
        element={
          <Suspense fallback={<Loader />}>
            <PrivateRoute>
              <Profile />
            </PrivateRoute>
          </Suspense>
        }
      />
      <Route
        path="/dashboard"
        element={
          <Suspense fallback={<Loader />}>
            <PrivateRoute>
              <Dashboard />
            </PrivateRoute>
          </Suspense>
        }
      />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}
