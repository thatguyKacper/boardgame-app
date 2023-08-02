import { Boardgame } from "../types/boardgame";
import { Meta } from "../types/meta";

const getAll = async (page: number, searchCategory: string, searchText: string, sortBy: string, sortOrder: string) => {
  const queryParams = new URLSearchParams({
    page: page.toString(),
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

  const data = await res.json() as Promise<{data: Boardgame[], meta: Meta[]}>;

  return data;
};

const getOne = async (id: number) => {
  const res = await fetch(`/api/boardgames/${id}`, {
    method: 'GET',
  });

  if (!res.ok) {
    throw new Error('Could not get data!');
  }

  const data = await res.json() as Promise<Boardgame>;

  return data;
};

const getRandom = async () => {
  const res = await fetch(`/api/boardgames/random`, {
    method: 'GET',
  });

  if (!res.ok) {
    throw new Error('Could not get data!');
  }

  const data = await res.json() as Promise<Boardgame>;

  return data;
};

const getTop = async (query: string) => {
  const res = await fetch(`/api/boardgames/lists?page=1${query}`, {
    method: 'GET',
  });

  if (!res.ok) {
    throw new Error('Could not get data!');
  }

  const data = await res.json() as Promise<{data: Boardgame[], meta: Meta[]}>;

  return data;
};

const addAsPlayed = async (id: number, token: string) => {
  const res = await fetch(`/api/boardgames/${id}/action/add-as-played`, {
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

const addToWishlist = async (id: number, token: string) => {
  const res = await fetch(`/api/boardgames/${id}/action/add-to-wishlist`, {
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

const addScore = async (id: number, token: string, score: number) => {
  const res = await fetch(`/api/boardgames/${id}/score/add`, {
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

const updateScore = async (id: number, token: string, score: number) => {
  const res = await fetch(`/api/boardgames/${id}/score/update`, {
    method: 'PATCH',
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

const removeScore = async (id: number, token: string) => {
  const res = await fetch(`/api/boardgames/${id}/score/remove`, {
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

const removeFromPlayed = async (id: number, token: string) => {
  const res = await fetch(`/api/boardgames/${id}/action/remove-from-played`, {
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

const removeFromWishlist = async (id: number, token: string) => {
  const res = await fetch(`/api/boardgames/${id}/action/remove-from-wishlist`, {
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
