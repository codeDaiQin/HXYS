Page({
  data: {
    url: "http://172.16.0.248:3000/",
  },
  onLoad(options) {
    const { code } = options;
    this.setData({
      url: `http://172.16.0.248:3000/?code=${code}`,
    });
  },
  // 接受h5发送的数据
  receivePostMsg(e: any) {
    console.log(e, "receivePostMsg");
  },
});
