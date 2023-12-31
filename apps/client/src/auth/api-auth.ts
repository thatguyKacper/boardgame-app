import { Auth } from "../interfaces/auth";

const signin = async (email: string, password: string) => {
  const res = await fetch('api/auth/signin/', {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({email, password}),
  });

  if (!res.ok) {
    throw new Error('Email or password incorrect!');
  }

  const data = await res.json();

  return data as Auth;
};

const signup = async (email: string, password: string) => {
    const res = await fetch('api/signup/', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({email, password}),
    });
    
    const data = await res.json();
  
    if (!res.ok) {
      throw new Error(data.message);
    }
    
    return data as Auth;
};

const getAccount = async (id: number, token: string) => {
  const res = await fetch(`/api/profile/${id}`, {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + token,
    },
  });

  if (!res.ok) {
    throw new Error('Unathorized!');
  }

  const data = await res.json();

  return data as Auth;
};

const editAccount = async (id: number, token: string, password: string, retypedPassword: string) => {
  const res = await fetch(`/api/profile/${id}`, {
    method: 'PATCH',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + token,
    },
    body: JSON.stringify({ password, retypedPassword }),
  });

  if (!res.ok) {
    throw new Error('Passwords are not identical!');
  }

  return;
};

const deleteAccount = async (id: number, token: string) => {
  const res = await fetch(`/api/profile/${id}`, {
    method: 'DELETE',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + token,
    },
  });

  if (!res.ok) {
    throw new Error('Could not delete account!');
  }

  return;
};

export { signin, signup, getAccount, editAccount, deleteAccount };
