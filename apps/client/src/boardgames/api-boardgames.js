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

export { getAll, getOne, getTop, getSearch };
