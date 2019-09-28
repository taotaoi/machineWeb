// pages/main/main.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    h: 0,
    w: 0,
    setW: 0,
    login: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      h: wx.getSystemInfoSync().windowHeight,
      w: wx.getSystemInfoSync().windowWidth
    });
    console.log("w:" + this.data.w + " h:" + this.data.h);
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  router(par) {
    var id = par.currentTarget.dataset.data;
    console.log('main Router:' + id);
    switch (id) {
      // 1、machine
      case 'listMA': {
        wx.navigateTo({
          url: '../machine/list/list',
        })
        break;
      }
      // 2、submit
      case 'submitAdd': {
        wx.navigateTo({
          url: '../fix/submit/insert/insert',
        })
        break;
      }
      case 'submitList':{
        wx.navigateTo({
          url: '../fix/submit/list/list',
        })
        break;
      }
      // 3、fixing
      case 'fixingList': {
        wx.navigateTo({
          url: '../fix/fixing/list/list',
        })
        break;
      }
      // 4、fixend
      case 'fixEndList': {
        wx.navigateTo({
          url: '../fix/fixend/list/list',
        })
        break;
      }
     
      default: {
        console.log('route err');
        break;
      }
    }

  },
})