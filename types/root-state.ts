import { AuthState, CommonState, PostState } from '@/types/reducer-states';

type RootState = {
  state: any;
  common: CommonState;
  auth: AuthState;
  posts: PostState;
};
export type { RootState };
