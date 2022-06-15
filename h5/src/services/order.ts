import request from '@/utils/request';
import {
  OrderListRequest,
  OrderListResponse,
  OrderDetailRequest,
  OrderDetailResponse
} from '@/interface/order';

// 获取订单列表
export const getOrderList = async (params: OrderListRequest) => {
  return request<OrderListResponse>('/order', {
    method: 'GET',
    params
  });
};

// 获取订单详情
export const getOrderDetail = async (params: OrderDetailRequest) => {
  return request<OrderDetailResponse>('/order', {
    method: 'GET',
    params
  });
};
