/**
 * request 网络请求工具
 * 更详细的 api 文档: https://github.com/umijs/umi-request
 */
import { extend } from 'umi-request';

/**
 * 异常处理程序
 */
const errorHandler = (error: { response: Response }): Response => {
  console.log(error, 'error');
  const { response } = error;
  if (response && response.status) {
    const errorText = response.statusText;
    const { status, url } = response;
  } else if (!response) {
    console.log(error);
  }
  return response;
};

const request = extend({
  errorHandler,
  // credentials: 'include' // 默认请求是否带上cookie
  credentials: 'omit'
});

request.interceptors.request.use((url, options) => {
  return {
    url: 'http://localhost:4396' + url,
    options
  };
});

request.interceptors.response.use(async (response) => {
  console.log(response);
  return response;
});

export default request;
