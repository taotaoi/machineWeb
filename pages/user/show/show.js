// pages/user/show/show.js
var tool = require('../../tools/tool.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    user:{}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.init();
  },
  init(){
    if (tool.isNull(getApp().globalData.user)){
      wx.reLaunch({
        url: "../login/login",
      });
    }
    else {
      this.setData({
        user: getApp().globalData.user
      })
    }
  },
  logOut(){
    getApp().globalData.user = {};
    wx.reLaunch({
      url: "../login/login",
    });
  }
  
})