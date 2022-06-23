import React, { useState, memo, Suspense, useEffect } from 'react';
import { TabBar, SpinLoading } from 'antd-mobile';
import { Route, Routes, useNavigate } from 'react-router-dom';
import to from 'await-to-js';
import wx from 'weixin-js-sdk';
import { wechatLogin, getToken, autoLogin } from '@/services/user';
import routers, { RouterType } from '@/config/router';
import menu from '@/config/menu';
import Error from '@/pages/error';
import { querystring } from '@/utils';
import notice from '@/utils/notice';
import { localGet, localSet } from '@/utils/localstorage';
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

  const autoLoginByToken = async () => {
    const token = localGet('token');
    if (!token || !Object.keys(token)?.length) return;

    const [err, user] = await to(autoLogin());

    console.log(err);

    if (err) {
      notice.error('autoLogin登陆失败');
      // navigate('/login');
      return;
    }

    console.log(user);
    notice.success('autoLogin 成功');
  };

  const wxLogin = async () => {
    const { code, nickName, avatarUrl } = querystring(location.search);

    if (!code) {
      wx.miniProgram.redirectTo({ url: '/pages/login/login' }); // 跳转到登录页
      return;
    }

    const appSecret = import.meta.env.VITE_APP_SECRET;
    const appId = import.meta.env.VITE_APP_ID;
    const [userErr, user] = await to(wechatLogin({ code, appSecret, appId }));

    if (userErr) {
      notice.error('登陆出错了');
      // navigate('/login');  // 重新登陆
      return;
    }

    if (!user) {
      notice.error('登陆状态已过期请重新登陆');
      // navigate('/login');
      return;
    }

    // 获取token
    const [tokenErr, token] = await to(getToken(user.userId));
    if (tokenErr) {
      notice.error('获取token出错了');
      return;
    }
    console.log(token);

    // 存储
    localSet('token', token);
    localSet('nickName', nickName);
    localSet('avatarUrl', avatarUrl);
  };

  const init = async () => {
    const token = localGet('token');

    if (token) {
      autoLoginByToken();
      return;
    }
    wxLogin();
  };

  useEffect(() => {
    init();
    // localSet(
    //   'token',
    //   'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoib3FwQUU0LTkzZ3BMN3dhWVpEcF9Pd1cxaGw4USIsIk1hcENsYWltcyI6eyJ1c2VyX2lkIjoib3FwQUU0LTkzZ3BMN3dhWVpEcF9Pd1cxaGw4USJ9fQ.xCpkDlPaDY7ItzGrpieQJPNPtsKBxZeOYgZmPmU4sto'
    // );
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
