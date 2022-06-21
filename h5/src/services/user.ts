import request from '@/utils/request';
import { UserDetailResponse, WechatLoginRequest } from '@/interface/user';

// getUserDetail 获取用户详情
export const getUserDetail = async (): Promise<UserDetailResponse> =>
  request.get('/wechatLogin');

// wechatLogin 微信code码登陆
export const wechatLogin = async (
  params: WechatLoginRequest
): Promise<UserDetailResponse> =>
  request.get('/api/v1/user/wechatLogin', { params });
