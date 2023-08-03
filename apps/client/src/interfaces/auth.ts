export interface Auth {
  id: number;
  token: string;
};

export interface UserAuth {
  email: string,
  password: string
}

export interface UserEditAuth {
  id: number,
  token: string,
  password: string,
  retypedPassword: string
}

