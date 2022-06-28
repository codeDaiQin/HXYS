import request from '@/utils/request';
import {
  GoodsDetailRequest,
  GoodsDetailResponse,
  GoodsListRequest,
  GoodsListResponse
} from '@/interface/goods';

// 获取商品列表
export const getGoodsList = async (
  params: GoodsListRequest
): Promise<GoodsListResponse> => request.get('/api/v1/goods/list', { params });

// 获取商品详情
export const getGoodsDetail = async ({
  goods_id
}: GoodsDetailRequest): Promise<GoodsDetailResponse> =>
  request.get(`/api/v1/goods/${goods_id}`);
