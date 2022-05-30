import {
  SetOutline,
  MessageOutline,
  UnorderedListOutline,
  UserOutline
} from 'antd-mobile-icons';
import { MenuType } from './menu';

type UserMenuType = {
  extra?: string; // 额外信息
} & MenuType;

export default [
  {
    path: '/sort',
    title: '分类',
    icon: <UnorderedListOutline />
  },
  {
    path: '/about',
    title: '关于作者',
    icon: <MessageOutline />
  },
  {
    path: '/setting',
    title: '设置',
    icon: <SetOutline />
  }
] as UserMenuType[];
