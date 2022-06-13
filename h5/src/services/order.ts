import { OrderListRequest } from '@/interface/order';

// 获取订单列表
export const getOrderList = async (params: OrderListRequest) => {
  console.log(params);
};

// 获取订单详情
export const getOrderDetails = async (orderId: string) => {
  console.log(orderId);
};
