import React, { lazy } from "react";
import { MemoryRouterProps } from "react-router-dom";

export type RouterType = {
  path: string; // 路由路径
  redirect?: string; // 重定向
  title: string; // 标题
  Component: React.FC<MemoryRouterProps> | (() => any); // 组件
  children?: RouterType[]; // 子路由
};

export default [
  {
    // 首页
    path: "/",
    title: "首页",
    Component: lazy(() => import("@/pages/home")),
  },
  {
    // 下单
    path: "/buy",
    title: "下单",
    Component: lazy(() => import("@/pages/buy")),
  },
  {
    // 订单
    path: "/order",
    title: "订单",
    Component: lazy(() => import("@/pages/order")),
  },
  {
    // 我的
    path: "/me",
    title: "我的",
    Component: lazy(() => import("@/pages/me")),
  },
  {
    // 搜索
    path: "/search",
    title: "搜索",
    Component: lazy(() => import("@/pages/search")),
  },
] as RouterType[];
