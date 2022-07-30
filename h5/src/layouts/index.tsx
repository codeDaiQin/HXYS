import React, { useState, memo, Suspense, useEffect } from 'react';
import { TabBar } from 'antd-mobile';
import to from 'await-to-js';
import { Route, Routes, useNavigate } from 'react-router-dom';
import wx from 'weixin-js-sdk';
import Loading from '@/components/Loading';
import routers, { RouterType } from '@/config/router';
import menu from '@/config/menu';
import Error from '@/pages/error';
import { querystring } from '@/utils';
import { useAppDispatch } from '@/models/store';
import { getUserInfo, login } from '@/models/user';
import local from '@/utils/localstorage';
import { TOKEN_KEY } from '@/constants/local-storage-key';
import styles from './index.module.scss';

// 底部菜单
const Menu = memo(() => {
  // 当前页面url
  const { pathname, search } = location;
  const navigate = useNavigate();
  const [active, setActive] = useState(pathname + search); // todo
  const [showMenu, setShowMenu] = useState(false); // 展示底部菜单

  useEffect(() => {
    setActive(pathname + search);
    setShowMenu(!!routers.find((item) => item.path === pathname)?.showMenu);
  }, [pathname]);

  useEffect(() => {
    navigate(active);
  }, [active]);

  if (!showMenu) return null;

  return (
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
  );
});

const renderRoutes = (routes: RouterType[]): React.ReactNode[] =>
  routes.map(({ Component, path }) => (
    <Route key={path} path={path} element={<Component />} />
  ));

export default memo(() => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const init = async () => {
    const token = local.get(TOKEN_KEY);

    if (!token) {
      const { code, nickName, avatarUrl } = querystring(location.search);
      if (!code) {
        wx.miniProgram.redirectTo({ url: '/pages/login/login' }); // 跳转到登录页
        return;
      }

      const [err] = await to(dispatch(login(code)));
      if (err) {
        console.log(err, '登陆失败 跳转到登录页');
      }
      return;
    }

    const [err] = await to(dispatch(getUserInfo()));
    if (err) {
      console.log(err, '获取用户信息失败 跳转到登录页');
    }
  };

  useEffect(() => {
    init();
  }, []);

  return (
    <div className={styles.layout}>
      <main className={styles.main}>
        <Suspense fallback={<Loading loading={true} />}>
          <Routes>
            {renderRoutes(routers)}
            <Route path="*" element={<Error />} />
          </Routes>
        </Suspense>
      </main>
      <Menu />
    </div>
  );
});
