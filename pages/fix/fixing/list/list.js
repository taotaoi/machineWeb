// pages/fix/fixing/list/list.js
var axFixing = require('../../../ax/fix/fixing.js');
var tool = require('../../../tools/tool.js');
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
    })
    axFixing.getAllList().then(function(data){
      wx.hideLoading();
      if(tool.chkRes(data)) return;
      console.log(data);
      that.setData({
        list:data.data.data
      });
    });
  }


})