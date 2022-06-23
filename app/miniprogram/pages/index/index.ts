Page({
  data: {
    url: "http://localhost:3000",
  },
  onLoad(options) {
    wx.getUserProfile({
      desc: "展示用户信息", // 声明获取用户个人信息后的用途，后续会展示在弹窗中，请谨慎填写
      success: (res) => {
        console.log(res);
      },
      fail: (err) => {
        console.log(err);
      },
    });
    const { code = "", nickName = "", avatarUrl = "" } = options;
    this.setData({
      url: `http://localhost:3000?code=${code}&nickName=${nickName}&avatarUrl=${avatarUrl}`,
    });
  },
});
