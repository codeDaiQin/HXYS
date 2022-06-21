import { AddressType } from './address';

// 用户基础信息
export type UserBaseInfo = {
  userId: string;
  name: string;
};

// 用户详情信息
export type UserDetailInfo = {
  address: AddressType[];
} & UserBaseInfo;

// 微信登陆请求
export type WechatLoginRequest = {
  code: string;
  appSecret: string;
  appId: string;
};

// 用户详情响应
export type UserDetailResponse = UserDetailInfo;
