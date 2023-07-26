const getAll = async (page) => {
  const res = await fetch(`/api/boardgames?page=${page}`, {
    method: 'GET',
  });

  if (!res.ok) {
    throw new Error('Could not get data!');
  }

  const data = await res.json();

  return data;
};

const getOne = async (id) => {
  const res = await fetch(`api/boardgames/${id}`, {
    method: 'GET',
  });

  if (!res.ok) {
    throw new Error('Could not get data!');
  }

  const data = await res.json();

  return data;
};

const getTop = async (query) => {
  const res = await fetch(`/api/boardgames/lists?page=1${query}`, {
    method: 'GET',
  });

  if (!res.ok) {
    throw new Error('Could not get data!');
  }

  const data = await res.json();

  return data;
};

const getSearch = async (page, searchCategory, searchText) => {
  const res = await fetch(
    `/api/boardgames?page=${page}&${searchCategory}=${searchText}`,
    {
      method: 'GET',
    }
  );

  if (!res.ok) {
    throw new Error('Could not get data!');
  }

  const data = await res.json();

  return data;
};

const addAsPlayed = async (id, token) => {
  const res = await fetch(`/api/boardgames/${id}/add-as-played`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + token,
    },
  });

  if (!res.ok) {
    throw new Error('Could not add boardgame!');
  }
};

const addToWishlist = async (id, token) => {
  const res = await fetch(`/api/boardgames/${id}/add-to-wishlist`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + token,
    },
  });

  if (!res.ok) {
    throw new Error('Could not add boardgame!');
  }
};

const removeFromPlayed = async (id, token) => {
  const res = await fetch(`/api/boardgames/${id}/remove-from-played`, {
    method: 'DELETE',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + token,
    },
  });

  if (!res.ok) {
    throw new Error('Could not remove boardgame!');
  }
};

const removeFromWishlist = async (id, token) => {
  const res = await fetch(`/api/boardgames/${id}/remove-from-wishlist`, {
    method: 'DELETE',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + token,
    },
  });

  if (!res.ok) {
    throw new Error('Could not remove boardgame!');
  }
};

export {
  getAll,
  getOne,
  getTop,
  getSearch,
  addAsPlayed,
  addToWishlist,
  removeFromPlayed,
  removeFromWishlist,
};
