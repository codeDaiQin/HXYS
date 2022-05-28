import React, { useEffect } from "react";
import wx from "weixin-js-sdk";
import { MemoryRouter as Router } from "react-router-dom";
import { ConfigProvider } from "antd-mobile";
import zhCN from "antd-mobile/es/locales/zh-CN";
import Layout from "@/layouts";
import "./index.module.scss";

const App: React.FC = () => {
  // const url = window.location.href;

  // const handleLogin = () => {
  //   // 跳转到登录页
  //   wx.miniProgram.redirectTo({ url: "/pages/login/login" });
  //   const url = window.location.href;
  //   const urlParams = new URLSearchParams(url.split("?")[1]);
  //   const code = urlParams.get("code");
  //   console.log(code);
  // };

  // // useEffect(() => {
  // //   // 向小程序端发送数据
  // //   wx.miniProgram.postMessage({ data: "foo" });

  // //   // 需回退到小程序上层页面
  // //   wx.miniProgram.navigateBack();
  // //   // https://api.weixin.qq.com/sns/jscode2session?appid=APPID&secret=SECRET&js_code=JSCODE&grant_type=authorization_code
  // // }, []);

  // useEffect(() => {
  //   console.log(url);
  // }, []);

  return (
    <ConfigProvider locale={zhCN}>
      {/* store */}
      <Router>
        <Layout />
      </Router>
    </ConfigProvider>
  );
};

export default App;
