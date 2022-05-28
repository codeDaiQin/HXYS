Page({
  getUserProfile() {
    // 推荐使用wx.getUserProfile获取用户信息，开发者每次通过该接口获取用户个人信息均需用户确认，开发者妥善保管用户快速填写的头像昵称，避免重复弹窗
    wx.getUserProfile({
      desc: "展示用户信息", // 声明获取用户个人信息后的用途，后续会展示在弹窗中，请谨慎填写
      success: (res) => {
        console.log(res);
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true,
        });
      },
    });
  },
  handleLogin() {
    // 登录
    wx.login({
      success: (res) => {
        console.log(res.code);
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
        wx.request({
          url: "http://127.0.0.1:8000/ping", //仅为示例，并非真实的接口地址
          data: {
            code: res.code,
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
