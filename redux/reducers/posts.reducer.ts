import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { Posts } from '@/base/types/posts';
import { PostState } from '@/base/types/reducer-states';

const initialCommonState: PostState = {
  posts: undefined,
};

export const queryDataSlice = createSlice({
  name: 'posts',
  initialState: initialCommonState,
  reducers: {
    storePosts: (state: PostState, action: PayloadAction<Posts>) => {
      state.posts = action.payload;
    },
  },
});

export const { storePosts } = queryDataSlice.actions;
export default queryDataSlice.reducer;
