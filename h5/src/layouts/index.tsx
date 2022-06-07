import React, { useState, memo, Suspense, useEffect } from 'react';
import { TabBar, SpinLoading } from 'antd-mobile';
import { Route, Routes, useNavigate } from 'react-router-dom';
import routers, { RouterType } from '@/config/router';
import menu from '@/config/menu';
import Error from '@/pages/error';
import styles from './index.module.scss';

const Bottom = memo(() => {
  // 当前页面url
  const { pathname, search } = location;
  const navigate = useNavigate();
  const [active, setActive] = useState(pathname + search); // todo

  useEffect(() => {
    navigate(active);
  }, [active]);

  return (
    <TabBar safeArea activeKey={active} onChange={(value) => setActive(value)}>
      {menu.map((item) => (
        <TabBar.Item key={item.path} icon={item.icon} title={item.title} />
      ))}
    </TabBar>
  );
});

const PageLoading = memo(() => (
  <div className={styles.loading}>
    <SpinLoading />
  </div>
));

const renderRoutes = (routes: RouterType[]): React.ReactNode[] =>
  routes.map(({ Component, path }) => (
    <Route key={path} path={path} element={<Component />} />
  ));

export default memo(() => {
  const init = () => {
    console.log('init');
  };

  useEffect(() => {
    init();
  }, []);

  return (
    <div className={styles.layout}>
      <main className={styles.main}>
        <Suspense fallback={<PageLoading />}>
          <Routes>
            {renderRoutes(routers)}
            <Route path="*" element={<Error />} />
          </Routes>
        </Suspense>
      </main>
      <footer className={styles.footer}>
        <Bottom />
      </footer>
    </div>
  );
});
