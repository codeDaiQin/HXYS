import axios from 'axios';
import { localGet } from './localstorage';

const request = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL,
  timeout: 1000
});

request.interceptors.request.use(
  (config) => {
    config.headers = {
      Authorization: localGet('token'),
      ...config.headers
    };
    return config;
  },
  (err) => {
    return Promise.reject(err);
  }
);

request.interceptors.response.use((response) => {
  return new Promise((resolve, reject) => {
    const { data } = response;
    const { data: res, msg, code } = data;

    if (code >= 200 && code < 300) {
      resolve(res);
    }
    reject(msg);
  });
});

export default request;
