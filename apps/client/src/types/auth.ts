export type Auth = {
  id: number;
  token: string;
};

export type UserAuth = {
  email: string,
  password: string
}

export type UserEditAuth = {
  id: number,
  token: string,
  password: string,
  retypedPassword: string
}

  