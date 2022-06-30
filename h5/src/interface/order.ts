import { PaginationType, ListResponse } from '.';
import { AddressType } from './address';
import { GoodsDetailInfo } from './goods';

// 订单状态
export enum OrderTypeEnum {
  InProgress, // 进行中
  Completed, // 已完成
  Refund // 退款
}

// 订单进度状态
export enum OrderStepEnum {
  wait,
  process,
  finish,
  error
}

// 订单进度
export type OrderStep = {
  time: string; // 时间
  content: string; // 操作的内容
  status: OrderStepEnum;
  step_id: number;
};

// 基础订单信息
export type OrderBaseInfo = {
  orderId: string;
  status: OrderTypeEnum; // 订单状态
};

// 订单详情信息
export type OrderDetailInfo = {
  createTime: number; // 创建时间 时间戳
  remarks: string; // 备注
  address: AddressType; // 收货地址
  goods: GoodsDetailInfo;
  steps: OrderStep[]; // 订单进度
  rate: number; // 评分
} & OrderBaseInfo;

// 订单列表请求
export type OrderListRequest = {
  type: OrderTypeEnum; // 订单状态
} & PaginationType;

// 订单列表响应
export type OrderListResponse = ListResponse<OrderBaseInfo>;

// 订单详情请求
export type OrderDetailRequest = Pick<OrderDetailInfo, 'orderId'>;

// 订单详情响应
export type OrderDetailResponse = OrderDetailInfo;
