import { ListResponse } from '.';

// 商品类型
export type GoodsType =
  | 'calligraphy' // 书法
  | 'sealCutting' // 篆刻
  | 'gift' // 礼品
  | 'other' // 其他
  | 'all'; // 全部

// 商品基本信息
export type GoodsBaseInfo = {
  goodsId: string;
  goodsType: GoodsType;
  name: string;
  cover: string; // 封面图
};

// 商品详情信息
export type GoodsDetailInfo = {
  price: number; // 价格
} & GoodsBaseInfo;

// 商品详情请求
export type GoodsDetailRequest = Pick<GoodsBaseInfo, 'goodsId'>;

// 商品详情响应
export type GoodsDetailResponse = GoodsDetailInfo;

// 商品列表请求
export type GoodsListRequest = Pick<GoodsBaseInfo, 'goodsType'>;

// 商品列表响应
export type GoodsListResponse = ListResponse<GoodsBaseInfo>;
