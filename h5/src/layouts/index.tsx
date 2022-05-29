import React, { useState, memo, Suspense, useEffect, useMemo } from "react";
import { TabBar, SpinLoading } from "antd-mobile";
import { Route, Routes, useNavigate } from "react-router-dom";
import routers, { RouterType } from "@/config/router";
import menu from "@/config/menu";
import Error from "@/pages/error";
import { pathToRegexp } from "path-to-regexp";
import Style from "./index.module.scss";

const Bottom = memo(() => {
  // 当前页面url
  const { pathname, search } = location;
  const navigate = useNavigate();
  const [active, setActive] = useState(pathname + search); // todo

  useEffect(() => {
    navigate(active);
  }, [active]);

  useEffect(() => {
    // 根据pathname更改页面标题
    document.title =
      routers.find(({ path }) => pathToRegexp(path).exec(pathname))?.title ??
      "出错啦";
  }, [pathname]);

  return (
    <TabBar safeArea activeKey={active} onChange={(value) => setActive(value)}>
      {menu.map((item) => (
        <TabBar.Item key={item.path} icon={item.icon} title={item.title} />
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
          <Routes>
            {renderRoutes(routers)}
            <Route path="*" element={<Error />} />
          </Routes>
        </Suspense>
      </main>
      <footer className={Style.footer}>
        <Bottom />
      </footer>
    </div>
  );
});
