import { Auth } from "../types/auth";

const isAuthenticated = (): Auth | false => {
  const userId = sessionStorage.getItem('userId');
  const jwt = sessionStorage.getItem('jwt');

  if (userId && jwt) {
    return {
      id: JSON.parse(userId),
      token: JSON.parse(jwt),
    };
  } else {
    return false;
  }
};

const authenticate = (data: Auth) => {
  sessionStorage.setItem('jwt', JSON.stringify(data.token));
  sessionStorage.setItem('userId', JSON.stringify(data.id));
};

const clearSession = () => {
  sessionStorage.removeItem('jwt');
  sessionStorage.removeItem('userId');
};

export { isAuthenticated, authenticate, clearSession };
