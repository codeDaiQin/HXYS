// 分页
export type PaginationType = {
  pageSize?: number;
};

// 列表response
export type ListResponse<T> = {
  code: number;
  msg: string;
  data: {
    total: number;
    list: T[];
  };
};

// 地址
export type AddressType = {
  city: string; //市
  detailed: string; // 详细地址
  consignee: string; // 收货人
  phone: number;
};
