import { AuthState, CommonState } from '@/types/reducer-states';

type RootState = {
  state: any;
  common: CommonState;
  auth: AuthState;
};
export type { RootState };
