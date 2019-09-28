// pages/fix/fixend/list/list.js
var tool = require('../../../tools/tool.js');
var axFixEnd = require('../../../ax/fix/fixend.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    list:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.init();
  },
  init(){
    var that = this;
    wx.showLoading({
      title: 'waiting',
    });
    axFixEnd.getAllList().then(function(data){
      wx.hideLoading();
      console.log(data);
      if(tool.chkRes(data)) return;
      that.setData({
        list:data.data.data
      })
    });
  }

})