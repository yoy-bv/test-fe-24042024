import { AxiosResponse } from 'axios';

import { LoginRequest, LoginResponse } from '@/base/types/auth';
import api from '../api';

export function login(data: LoginRequest): Promise<AxiosResponse<LoginResponse>> {
  return api.post('/login', data);
}
