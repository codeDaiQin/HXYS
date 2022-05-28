import React, { useState, memo, Suspense, useEffect } from "react";
import { TabBar, SpinLoading } from "antd-mobile";
import { Route, Routes, useNavigate, MemoryRouter } from "react-router-dom";
import {
  AppOutline,
  MessageOutline,
  UnorderedListOutline,
  UserOutline,
} from "antd-mobile-icons";
import routers, { RouterType } from "@/router";
import Style from "./index.module.scss";

const Bottom = memo(() => {
  const navigate = useNavigate();
  const [active, setActive] = useState(location.pathname); // todo

  const tabs = [
    {
      key: "/",
      title: "首页",
      icon: <AppOutline />,
    },
    {
      key: "/buy",
      title: "下单",
      icon: <UnorderedListOutline />,
    },
    {
      key: "/order",
      title: "订单",
      icon: <MessageOutline />,
    },
    {
      key: "/me",
      title: "我的",
      icon: <UserOutline />,
    },
  ];

  useEffect(() => {
    navigate(active);
  }, [active]);

  return (
    <TabBar safeArea activeKey={active} onChange={(value) => setActive(value)}>
      {tabs.map((item) => (
        <TabBar.Item key={item.key} icon={item.icon} title={item.title} />
      ))}
    </TabBar>
  );
});

const PageLoading = memo(() => (
  <div className={Style.loading}>
    <SpinLoading />
  </div>
));

const renderRoutes = (routes: RouterType[]): React.ReactNode[] =>
  routes.map(({ Component, path }) => (
    <Route key={path} path={path} element={<Component />} />
  ));

export default memo(() => {
  return (
    <div className={Style.layout}>
      <main className={Style.main}>
        <Suspense fallback={<PageLoading />}>
          <Routes>{renderRoutes(routers)}</Routes>
        </Suspense>
      </main>
      <footer className={Style.footer}>
        <Bottom />
      </footer>
    </div>
  );
});
