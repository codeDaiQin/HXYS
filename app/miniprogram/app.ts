// app.ts
App<IAppOption>({
  globalData: {},
  onLaunch() {
    // 展示本地存储能力
    const logs = wx.getStorageSync("logs") || [];
    logs.unshift(Date.now());
    wx.setStorageSync("logs", logs);

    // 登录
    wx.login({
      success: (res) => {
        console.log(res.code);
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
        wx.request({
          url: "http://127.0.0.1:8080/getOpenId", //仅为示例，并非真实的接口地址
          data: {
            code: res.code,
            appId: "wx8d3bbd9dbc9a98d7",
            appSecret: "916a238c0f4d4caa3337e84f5887aa56",
          },
          // header: {
          //   "content-type": "application/json", // 默认值
          // },
          success(res) {
            console.log(res.data);
          },
        });
      },
    });
  },
});
