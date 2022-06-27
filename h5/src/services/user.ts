import request from '@/utils/request';
import {
  LoginResponse,
  UserDetailResponse,
  WechatLoginRequest
} from '@/interface/user';

// wechatLogin 微信code码登陆 登陆成功返回token
export const wechatLogin = async (
  params: WechatLoginRequest
): Promise<LoginResponse> =>
  request.get('/api/v1/user/wechatLogin', { params });

// 获取用户信息
export const getUserDetail = async (): Promise<UserDetailResponse> =>
  request.get('/api/v1/user/info');
