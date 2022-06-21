import { ListResponse } from '.';

// 地址
export type AddressType = {
  address_id: string; // 地址id
  detailed: string; // 详细地址
  consignee: string; // 收货人
  phone: number;
  isDefault?: boolean;
};

// 地址表单类型
export type AddressFormType = Omit<AddressType, 'address_id'>;

// 地址列表响应
export type AddressResponse = ListResponse<AddressType>;
