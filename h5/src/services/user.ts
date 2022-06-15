import request from '@/utils/request';
import { UserDetailResponse, WechatLoginRequest } from '@/interface/user';

// 获取用户详情
export const getUserDetail = async () => {
  return request<UserDetailResponse>('/', {
    method: 'GET'
  });
};

// 微信code码登陆
export const wechatLogin = async (params: WechatLoginRequest) => {
  return request<UserDetailResponse>('/', {
    method: 'GET',
    params
  });
};
