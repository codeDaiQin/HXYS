import request from '@/utils/request';
import {
  GoodsDetailRequest,
  GoodsDetailResponse,
  GoodsListRequest,
  GoodsListResponse
} from '@/interface/goods';

// 获取商品列表
export const getGoodsList = async (params: GoodsListRequest) => {
  return request<GoodsListResponse>('/api/v1/goods/list', {
    method: 'GET',
    params
  });
};

// 获取商品详情
export const getGoodsDetail = async (params: GoodsDetailRequest) => {
  return request<GoodsDetailResponse>('/a', {
    method: 'GET',
    params
  });
};
