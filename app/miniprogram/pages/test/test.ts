Page({
  data: {
    url: 'http://localhost:3000/'
  },
  onLoad() {
    console.log('web-view 测试');
  },
  // 向 h5 端发送消息
  receivePostMsg(e: any) {
    console.log(e, 'receivePostMsg');
  }
});
