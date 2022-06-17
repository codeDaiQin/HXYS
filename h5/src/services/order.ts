import request from '@/utils/request';
import {
  OrderListRequest,
  OrderListResponse,
  OrderDetailRequest,
  OrderDetailResponse
} from '@/interface/order';

// 获取订单列表
export const getOrderList = async (
  params: OrderListRequest
): Promise<OrderListResponse> => request.get('/order', { params });

// 获取订单详情
export const getOrderDetail = async (
  params: OrderDetailRequest
): Promise<OrderDetailResponse> => request.get('/order', { params });
