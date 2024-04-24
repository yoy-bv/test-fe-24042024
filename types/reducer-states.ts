import { User } from '@/types/user';
import { Posts } from '@/base/types/posts';

type TokenState = {
  accessToken?: string;
  refreshToken?: string;
  tokenType?: string;
  expiresIn?: string;
  expiresAt?: string;
};

type AuthState = {
  user?: User;
  loginStep?: number;
  email?: string;
  token: TokenState;
};

type CommonState = {
  isSidebarOpen: boolean;
  startDate: string;
  endDate: string;
};

type PostState = {
  posts?: Posts
}
export type { AuthState, CommonState, TokenState, PostState };
