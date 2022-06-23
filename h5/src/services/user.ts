import request from '@/utils/request';
import { UserDetailResponse, WechatLoginRequest } from '@/interface/user';

// autoLogin 获取用户详情
export const autoLogin = async (): Promise<UserDetailResponse> =>
  request.get('/api/v1/user/autoLogin');

// wechatLogin 微信code码登陆
export const wechatLogin = async (
  params: WechatLoginRequest
): Promise<UserDetailResponse> =>
  request.get('/api/v1/user/wechatLogin', { params });

// 获取token
export const getToken = async (userId: string): Promise<string> =>
  request.get('/auth', {
    params: userId
  });
