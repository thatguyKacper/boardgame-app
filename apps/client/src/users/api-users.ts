import { Meta } from "../interfaces/meta";
import { User } from "../interfaces/user";

const getAll = async (page: number) => {
  const res = await fetch(`/api/users?page=${page}`, {
    method: 'GET',
  });

  if (!res.ok) {
    throw new Error('Could not get data!');
  }

  const data = await res.json() as Promise<{data: User[], meta: Meta}>;

  return data;
};

const getOne = async (id: number) => {
  const res = await fetch(`/api/users/${id}`, {
    method: 'GET',
  });

  if (!res.ok) {
    throw new Error('Could not get data!');
  }

  const data = await res.json() as Promise<{data: User}>;

  return data;
};

export { getAll, getOne };
