import { ListResponse } from '.';
import { GoodsBaseInfo, GoodsType } from './goods';

// 推荐类型
export type RecommendType =
  | 'banner' // 轮播图
  | 'recommend'; // 商品推荐

// 推荐详情
export type RecommendDetailInfo = {
  // 待补充
} & GoodsBaseInfo;

// 推荐列表请求
export type RecommendListRequest = {
  type: RecommendType; // 推荐类型
  length: number; // 获取数量
  goodsType: GoodsType | 'all'; // 推荐类型
};

// 推荐列表响应
export type RecommendListResponse = ListResponse<RecommendDetailInfo>;
