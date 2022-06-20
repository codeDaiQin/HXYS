import React, { lazy } from 'react';
import { BrowserRouterProps } from 'react-router-dom';

export type RouterType = {
  path: string; // 路由路径
  redirect?: string; // 重定向
  title: string; // 标题
  Component:
    | React.FC<BrowserRouterProps>
    | (() => React.ReactElement<BrowserRouterProps>); // 组件
  children?: RouterType[]; // 子路由
  showMenu?: boolean; // 是否展示菜单
};

export default [
  {
    // 首页
    path: '/',
    title: '首页',
    Component: lazy(() => import('@/pages/home')),
    showMenu: true
  },
  {
    // 分类
    path: '/sort',
    title: '分类',
    Component: lazy(() => import('@/pages/sort')),
    showMenu: true
  },
  {
    // 订单
    path: '/order',
    title: '订单',
    Component: lazy(() => import('@/pages/order')),
    showMenu: true
  },
  {
    // 我的
    path: '/me',
    title: '我的',
    Component: lazy(() => import('@/pages/me')),
    showMenu: true
  },
  {
    // 我的
    path: '/address',
    title: '地址',
    Component: lazy(() => import('@/pages/address/detail'))
  },
  {
    // 关于作者
    path: '/about',
    title: '关于作者',
    Component: lazy(() => import('@/pages/about'))
  },
  {
    // 详情
    path: '/detail',
    title: '详情',
    Component: lazy(() => import('@/pages/detail'))
  },
  {
    // 登陆
    path: '/login',
    title: '登陆',
    Component: lazy(() => import('@/pages/login'))
  }
] as RouterType[];
