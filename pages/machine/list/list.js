// pages/machine/list/list.js
var axMa = require('../../ax/machine/machine.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    machineList:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log("op");
    this.init();
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

  init(){
    var that = this;
    wx.showLoading({
      title: 'waiting',
    })
    axMa.getAllList().then(function(data){
      wx.hideLoading();
      console.log(data);
      that.setData({
        machineList: data.data.data
      });
    });
  }
})