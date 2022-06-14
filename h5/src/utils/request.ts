/**
 * request 网络请求工具
 * 更详细的 api 文档: https://github.com/umijs/umi-request
 */
import { extend } from 'umi-request';
import { Toast } from 'antd-mobile';

/**
 * 异常处理程序
 */
const errorHandler = (error: { response: Response }): Response => {
  const { response } = error;
  if (response && response.status) {
    const errorText = response.statusText;
    const { status, url } = response;
    Toast.show({
      icon: 'fail',
      content: `请求错误 ${status}: ${url} - ${errorText}`
    });
  } else if (!response) {
    Toast.show({
      icon: 'fail',
      content: '您的网络发生异常，无法连接服务器'
    });
  }
  return response;
};

const request = extend({
  errorHandler, // 默认错误处理
  credentials: 'include' // 默认请求是否带上cookie
  // credentials: 'omit'
});

export default request;
