import axios from 'axios';
import { TOKEN_KEY } from '@/constants/local-storage-key';
import local from './localstorage';

const request = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL,
  timeout: 10000
});

request.interceptors.request.use(
  (config) => {
    config.headers = {
      Authorization: local.get(TOKEN_KEY),
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
