import request from '@/utils/request';
import {
  AddressFormType,
  AddressResponse,
  AddressType
} from '@/interface/address';

// addAddress 新增地址
export const addAddress = async (data: AddressFormType): Promise<AddressType> =>
  request.post('/api/v1/address', {
    data
  });

// updateAddress 更改地址
export const updateAddress = async (data: AddressType): Promise<any> =>
  request.put('/api/v1/address', {
    data
  });

// getAddressList 获取地址列表
export const getAddressList = async (): Promise<AddressResponse> =>
  request.get('/api/v1/address');
