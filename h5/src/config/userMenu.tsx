import {
  SetOutline,
  MessageOutline,
  UnorderedListOutline
} from 'antd-mobile-icons';
import { MenuType } from './menu';

type UserMenuType = {
  extra?: string; // 额外信息
} & MenuType;

export default [
  {
    path: '/address',
    title: '收货地址',
    icon: <UnorderedListOutline />
  },
  {
    path: '/about',
    title: '关于海兴印社',
    icon: <MessageOutline />
  },
  {
    path: '/history',
    title: '浏览历史',
    icon: <MessageOutline />
  },
  {
    path: '/setting',
    title: '设置',
    icon: <SetOutline />
  }
] as UserMenuType[];
