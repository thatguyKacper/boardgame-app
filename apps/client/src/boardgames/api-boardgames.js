const getAll = async (page, searchCategory, searchText, sortBy, sortOrder) => {
  const queryParams = new URLSearchParams({
    page,
  });

  if (searchCategory && searchText) {
    queryParams.append(searchCategory, searchText);
  }

  if (sortBy && sortOrder) {
    queryParams.append('sortBy', sortBy);
    queryParams.append('sortOrder', sortOrder);
  }

  const res = await fetch(`/api/boardgames?${queryParams}`, {
    method: 'GET',
  });

  if (!res.ok) {
    throw new Error('Could not get data!');
  }

  const data = await res.json();

  return data;
};

const getOne = async (id) => {
  const res = await fetch(`/api/boardgames/${id}`, {
    method: 'GET',
  });

  if (!res.ok) {
    throw new Error('Could not get data!');
  }

  const data = await res.json();

  return data;
};

const getRandom = async () => {
  const res = await fetch(`/api/boardgames/random`, {
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

const addScore = async (id, token, score) => {
  const res = await fetch(`/api/boardgames/${id}/score-boardgame`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + token,
    },
    body: JSON.stringify({ score }),
  });

  if (!res.ok) {
    throw new Error('Could not add score!');
  }
};

const updateScore = async (id, token, score) => {
  const res = await fetch(`/api/boardgames/${id}/score-boardgame`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + token,
    },
    body: JSON.stringify({ score }),
  });

  if (!res.ok) {
    throw new Error('Could not update score!');
  }
};

const removeScore = async (id, token) => {
  const res = await fetch(`/api/boardgames/${id}/remove-score`, {
    method: 'DELETE',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + token,
    },
  });

  if (!res.ok) {
    throw new Error('Could not remove score!');
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
  getRandom,
  getTop,
  addAsPlayed,
  addToWishlist,
  addScore,
  updateScore,
  removeScore,
  removeFromPlayed,
  removeFromWishlist,
};
