import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { User } from '@/base/types/user';
import { AuthState } from '@/base/types/reducer-states';

const initialCommonState: AuthState = {
  user: undefined,
  loginStep: 0,
  email: '',
  token: {
    accessToken: '',
    refreshToken: '',
    tokenType: '',
    expiresIn: '',
    expiresAt: '',
  },
};

export const queryDataSlice = createSlice({
  name: 'auth',
  initialState: initialCommonState,
  reducers: {
    storeUser: (state: AuthState, action: PayloadAction<User>) => {
      state.user = action.payload;
    },
    changeLoginStep: (state: AuthState, action: PayloadAction<number>) => {
      state.loginStep = action.payload;
    },
    saveLoginUser: (state: AuthState, action: PayloadAction<AuthState>) => {
      const { loginStep, email, token } = action.payload;
      state.loginStep = loginStep;
      state.email = email;
      state.token = token;
    },
  },
});

export const { storeUser, changeLoginStep, saveLoginUser } = queryDataSlice.actions;
export default queryDataSlice.reducer;
