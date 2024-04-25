import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';
import { camelizeKeys, decamelizeKeys } from 'humps';
import Router from 'next/router';
import isNil from 'lodash.isnil';

import { URL_REFRESH_TOKEN } from '@/constants/endpoints';
import { CookiesStorage } from '@/libs/storage/cookie';
import { stringifyParams } from '@/libs/utils';
import { ROUTER } from '@/constants/common';

import { createAxios as createHttpClient } from './http/axios';

const defaultAxiosConfig: AxiosRequestConfig = {
  baseURL: process.env.API_URL,
  timeout: 30000,
  paramsSerializer: {
    serialize: (params) =>
      stringifyParams({
        params: decamelizeKeys({ ...params }),
        option: {
          encode: !isNil(params?.tags) || false,
        },
      }),
  },
};

let refreshAccessTokenRequest: Promise<unknown> | null = null;
export const getAccessToken = () => `Bearer ${CookiesStorage.getAccessToken()}`;
export const getRefreshToken = () => CookiesStorage.getRefreshToken();
export const refreshAccessToken = async () => {
  const httpClient = createHttpClient();
  const { data } = await httpClient.post(URL_REFRESH_TOKEN, { token: getRefreshToken() });
  CookiesStorage.setAccessToken(data.data.accessToken);
  CookiesStorage.setRefreshToken(data.data.refreshToken);
  return data.data.accessToken;
};

const transformResponse = (response: AxiosResponse) => {
  if (response?.data) {
    return { ...response, data: camelizeKeys(response.data) };
  }
  return response;
};
/* eslint-disable no-underscore-dangle, no-param-reassign */
const handleError = async (error: any, axiosInstance: AxiosInstance) => {
  const status = error.response?.status || error.status;
  switch (status) {
    case 401:
      try {
        if (error.config.__isRetryRequest) {
          refreshAccessTokenRequest = null;
          Router.push(ROUTER.Login);
          return Promise.reject(error);
        }
        refreshAccessTokenRequest = refreshAccessTokenRequest || refreshAccessToken();
        await refreshAccessTokenRequest;
        refreshAccessTokenRequest = null;
        error.config.__isRetryRequest = true;
        return axiosInstance.request(error.config);
      } catch (err) {
        return Promise.reject(error);
      }
    default:
      return Promise.reject(error);
  }
};
/* eslint-enable */
/* eslint-disable no-param-reassign, @typescript-eslint/no-non-null-assertion */
const api = axios.create({
  ...defaultAxiosConfig,
  headers: {
    ...defaultAxiosConfig.headers,
  },
});
api.interceptors.request.use((config) => {
  const authorization = getAccessToken();
  if (authorization) {
    config.headers!.Authorization = authorization;
  }
  if (config.data instanceof FormData) {
    return config;
  }
  config.headers['Content-Type'] = 'application/json';
  if (config.data) {
    config.data = decamelizeKeys(config.data);
  }
  if (config.params) {
    config.params = decamelizeKeys(config.params);
  }
  return config;
});
api.interceptors.response.use(transformResponse, (error) => handleError(error, api));

export default api;
