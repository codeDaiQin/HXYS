import axios from 'axios';

const request = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL,
  timeout: 1000
});

// request.interceptors.request.use(
//   (config) => {
//     return config;
//   },
//   (err) => {
//     return Promise.reject(err);
//   }
// );

request.interceptors.response.use((response) => {
  const { data } = response;

  return data.data;
});

export default request;
