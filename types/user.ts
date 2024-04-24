type User = {
  verified?: boolean;
  given_name: string;
  family_name: string;
  email: string;
  name: string;
  picture: string;
  token?: string;
};
type LoginForm = {
  username: string;
  password: string;
};
export type { User, LoginForm };
