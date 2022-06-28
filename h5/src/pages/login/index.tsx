import React, { useEffect, useState } from 'react';
import { querystring } from '@/utils';
import { wechatLogin } from '@/services/user';
import wx from 'weixin-js-sdk';
import { useNavigate } from 'react-router-dom';

export default React.memo(() => {
  const navigate = useNavigate();
  const login = async () => {
    const { code } = querystring(location.search);
    if (!code) {
      // 跳转到登录页
      wx.miniProgram.redirectTo({ url: '/pages/login/login' });
      return;
    }
    const appSecret = import.meta.env.VITE_APP_SECRET;
    const appId = import.meta.env.VITE_APP_ID;
    const user = await wechatLogin({ code, appSecret, appId });
    // 存储
    localStorage.setItem('openId', user.userId);
    navigate('/');
  };

  useEffect(() => {
    login();
  }, [location.search]);
  return <>login</>;
});
