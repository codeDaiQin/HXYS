Page({
  onLoad() {},
  getUserInfo(e: any) {
    console.log(e.detail.rawData);
    const { nickName, avatarUrl } = JSON.parse(e.detail.rawData) ?? {};
    // 推荐使用wx.getUserProfile获取用户信息，开发者每次通过该接口获取用户个人信息均需用户确认，开发者妥善保管用户快速填写的头像昵称，避免重复弹窗
    wx.login({
      success: ({ code }) => {
        wx.navigateTo({
          url: `../index/index?code=${code}&nickName=${nickName}&avatarUrl=${avatarUrl}`,
        });
      },
    });
  },
});
