export function isAuthenticated() {
  if (sessionStorage.getItem('jwt'))
    return {
      id: sessionStorage.getItem('userId'),
      token: JSON.parse(sessionStorage.getItem('jwt')),
    };
  else return false;
}

export function clearSession() {
  sessionStorage.removeItem('jwt');
  sessionStorage.removeItem('userId');
}

export default { isAuthenticated, clearSession };
