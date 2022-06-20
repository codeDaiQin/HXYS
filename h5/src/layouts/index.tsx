import React, { useState, memo, Suspense, useEffect } from 'react';
import { TabBar, SpinLoading, Toast } from 'antd-mobile';
import { Route, Routes, useNavigate } from 'react-router-dom';
import to from 'await-to-js';
import wx from 'weixin-js-sdk';
import { getUserDetail, wechatLogin } from '@/services/user';
import routers, { RouterType } from '@/config/router';
import menu from '@/config/menu';
import Error from '@/pages/error';
import { querystring } from '@/utils';
import styles from './index.module.scss';

const Bottom = memo(() => {
  // 当前页面url
  const { pathname, search } = location;
  const navigate = useNavigate();
  const [active, setActive] = useState(pathname + search); // todo
  const [showMenu, setShowMenu] = useState(false);

  useEffect(() => {
    setActive(pathname + search);
    setShowMenu(!!routers.find((item) => item.path === pathname)?.showMenu);
  }, [pathname]);

  useEffect(() => {
    navigate(active);
  }, [active]);

  return showMenu ? (
    <footer className={styles.footer}>
      {pathname + search}
      <TabBar
        safeArea
        activeKey={active.split('?')[0]}
        onChange={(value) => setActive(value)}
      >
        {menu.map((item) => (
          <TabBar.Item key={item.path} icon={item.icon} title={item.title} />
        ))}
      </TabBar>
    </footer>
  ) : null;
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
  const navigate = useNavigate();

  const init = async () => {
    // 如果有登陆状态直接retrun
    // if (!'hasLoginState') return;
    const { code } = querystring(location.search);
    if (!code) {
      // 跳转到登录页
      wx.miniProgram.redirectTo({ url: '/pages/login/login' });
      return;
    }
    const appSecret = import.meta.env.VITE_APP_SECRET;
    const appId = import.meta.env.VITE_APP_ID;
    const [err, user] = await to(wechatLogin({ code, appSecret, appId }));

    if (err) {
      console.log('出错了', err);
      // navigate('/login');  // 重新登陆
      return;
    }
    // 存储
    localStorage.setItem('openId', user.userId);

    if (!user) {
      Toast.show({
        content: '登陆状态已过期请重新登陆'
      });
      // navigate('/login');
      return;
    }
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
      <Bottom />
    </div>
  );
});
