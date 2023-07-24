const isAuthenticated = () => {
  if (sessionStorage.getItem('jwt'))
    return {
      id: sessionStorage.getItem('userId'),
      token: JSON.parse(sessionStorage.getItem('jwt')),
    };
  else return false;
};

const authenticate = (data) => {
  sessionStorage.setItem('jwt', JSON.stringify(data.token));
  sessionStorage.setItem('userId', JSON.stringify(data.id));
};

const clearSession = () => {
  sessionStorage.removeItem('jwt');
  sessionStorage.removeItem('userId');
};

export { isAuthenticated, authenticate, clearSession };
