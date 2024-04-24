import axios, { AxiosRequestConfig } from 'axios';

export const createAxios = (options: AxiosRequestConfig = {}) => {
  axios.create({
    baseURL: process.env.API_URL,
    timeout: 30000,
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
    },
    ...options,
  });

  axios.interceptors.response.use(
    (res) => res,
    (error) => Promise.reject(error),
  );
  return axios;
};
export default createAxios;
