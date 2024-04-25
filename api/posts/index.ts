import { AxiosResponse } from 'axios';

import { Posts, Comment } from '@/base/types/posts';
import api from '../api';

export function fetchPosts(limit: string) {
  return api.get(`/posts?_limit=${limit}}`);
}

export function fetchDetailPost(id: string): Promise<AxiosResponse<Posts>> {
  return api.get(`/posts/${id}`);
}

export function fetchCommentByIdPost(id: string): Promise<AxiosResponse<Comment[]>> {
  return api.get(`/posts/${id}/comments`);
}

