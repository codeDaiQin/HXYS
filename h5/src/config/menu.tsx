import React from 'react';
import {
  AppOutline,
  MessageOutline,
  UnorderedListOutline,
  UserOutline
} from 'antd-mobile-icons';

export type MenuType = {
  path: string; // 路由路径
  title: string; // 标题
  icon: React.ReactNode; // 图标
};

export default [
  {
    path: '/',
    title: '首页',
    icon: <AppOutline />
  },
  {
    path: '/sort',
    title: '下单',
    icon: <UnorderedListOutline />
  },
  {
    path: '/order',
    title: '订单',
    icon: <MessageOutline />
  },
  {
    path: '/me',
    title: '我的',
    icon: <UserOutline />
  }
] as MenuType[];
