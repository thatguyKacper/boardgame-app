const getAll = async (page) => {
  const res = await fetch(`/api/users?page=${page}`, {
    method: 'GET',
  });

  if (!res.ok) {
    throw new Error('Could not get data!');
  }

  const data = await res.json();

  return data;
};

const getOne = async (id) => {
  const res = await fetch(`api/users/${id}`, {
    method: 'GET',
  });

  if (!res.ok) {
    throw new Error('Could not get data!');
  }

  const data = await res.json();

  return data;
};

export { getAll, getOne };
