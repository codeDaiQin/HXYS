import { PaginationType, ListResponse, AddressType } from '.';

export enum OrderListEnum {
  InProgress, // 进行中
  Completed, // 已完成
  Refund // 退款
}

// 基础订单信息
export type OrderBaseInfo = {
  orderId: string;
  status: OrderListEnum; // 订单状态
};

// 订单详情信息
export type OrderDetailInfo = {
  createTime: number; // 创建时间 时间戳
  remarks: string; // 备注
  address: AddressType; // 收货地址
  consignee: string; // 收货人
  phone: number; // 手机号
} & OrderBaseInfo;

// 订单列表请求
export type OrderListRequest = {
  type: OrderListEnum; // 订单状态
} & PaginationType;

// 订单列表响应
export type OrderListResponse = ListResponse<OrderBaseInfo>;