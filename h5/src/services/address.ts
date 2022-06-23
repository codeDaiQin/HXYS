import request from '@/utils/request';
import {
  AddressFormType,
  AddressResponse,
  AddressType
} from '@/interface/address';

// addAddress 新增地址
export const addAddress = async (data: AddressFormType): Promise<AddressType> =>
  request.post('/api/v1/address/add', data);

// updateAddress 更改地址
export const updateAddress = async (
  address_id: number,
  data: AddressFormType
): Promise<unknown> => request.put(`/api/v1/address/${address_id}`, data);

// getAddressList 获取地址列表
export const getAddressList = async (): Promise<AddressResponse> =>
  request.get('/api/v1/address/list');

// deleteAddress 删除地址
export const deleteAddress = async (address_id: number): Promise<unknown> =>
  request.delete(`/api/v1/address/${address_id}`);
