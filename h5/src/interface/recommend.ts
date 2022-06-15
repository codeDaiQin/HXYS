import { ListResponse } from '.';

// 推荐类型
export enum RecommendTypeEnum {
  'banner', // 轮播图
  'recommend' // 商品推荐
}

// 推荐详情
export type RecommendDetailInfo = {
  id: string;
};

// 推荐列表请求
export type RecommendListRequest = {
  type: RecommendTypeEnum; // 推荐类型
  length: number; // 获取数量
  goodsType: string; // 推荐类型
};

// 推荐列表响应
export type RecommendListResponse = ListResponse<RecommendDetailInfo>;
