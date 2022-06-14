import { getUserDetail } from '@/services/user';
import { UserDetail } from '@/interface/user';

// 获取用户详情
export const getUserDetail = async (): Promise<UserDetail> => {
  return {
    name: '张三'
  };
};
