//app.js
App({
  globa: {
    URL:'https://taotaoi.oicp.vip/ma/act/'
  },
  onLaunch: function () {
    var that = this;
    // 获取头部总高度
    wx.getSystemInfo({
      success: res => {
        //导航高度
        that.globa.navH = res.statusBarHeight + 46;
      }, fail(err) {
        console.log(err);
      }
    });
  },
  globalData: {
    user: null
  }
})