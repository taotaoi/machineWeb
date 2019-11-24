// pages/fix/fixend/myList/myList.js
/**
 * 我提交的结束：当前登陆id提交的fixend。
 */
var tool = require('../../../tools/tool.js');
var axFixEnd = require('../../../ax/fix/fixend.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    list: [],
    user: {}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.init();
  },

  init() {
    var that = this;
    if (!tool.isLogin()) return;
    this.setData({
      user: getApp().globalData.user
    })
    console.log(this.data.user);
    wx.showLoading({
      title: 'waiting',
    });
    axFixEnd.getByFixEndUser(this.data.user.id).then(function (data) {
      console.log(data);
      wx.hideLoading();
      if (tool.chkRes(data)) return;
      that.setData({
        list: data.data.data
      })
    });
  },
  linkToShow(e) {
    var fixid = e.currentTarget.dataset.data;
    // console.log(fixid);
    tool.route("../show/show?id=" + fixid);
  },
})