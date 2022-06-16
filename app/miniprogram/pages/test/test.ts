Page({
  data: {
    url: "http://localhost:3000",
  },
  onLoad(options) {
    const { code } = options;
    if (code) {
      this.setData({
        url: `http://localhost:3000/login?code=${code}`,
      });
    }
  },
  // 接受h5发送的数据
  receivePostMsg(e: any) {
    console.log(e, "receivePostMsg");
  },
});
