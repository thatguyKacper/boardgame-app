const signin = async (email, password) => {
  const res = await fetch('api/auth/signin/', {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(email, password),
  });

  if (!res.ok) {
    throw new Error('Email or password incorrect!');
  }

  const data = await res.json();

  return data;
};

const signup = async (email, password) => {
  const res = await fetch('api/signup/', {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(email, password),
  });

  if (!res.ok) {
    throw new Error('Email already in use!');
  }

  const data = await res.json();

  return data;
};

export { signin, signup };
