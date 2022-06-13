// 分页
export type PaginationType = {
  pageSize: number;
  pageNum: number;
};

// 列表response
export type ListResponse<T> = {
  total: number;
  list: T[];
};

// 地址
export type AddressType = {
  city: string; //市
  detailed: string; // 详细地址
};
