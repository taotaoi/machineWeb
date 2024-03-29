// pages/machine/show/show.js
var axMa = require('../../ax/machine/machine.js');
var tool = require('../../tools/tool.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    showTab: {
      tab1: true,
      tab2: false,
      tab3: false
    },
    id:'',
    machine:{}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (par) {
    console.log(par.id);
    this.setData({
      id:par.id
    })
    this.init(this.data.id);
  },
  init(id){
    var that = this;
    wx.showLoading({
      title: 'waiting',
    })
    axMa.getById(id).then(function(data){
      wx.hideLoading();
      console.log(data);
      if(tool.chkRes(data)) return;
      that.setData({
        machine:data.data.data[0]
      })
    });
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

  tab1Btn() {
    this.setData({
      'showTab.tab1': true,
      'showTab.tab2': false,
      'showTab.tab3': false
    })
  },
  tab2Btn() {
    this.setData({
      'showTab.tab2': true,
      'showTab.tab1': false,
      'showTab.tab3': false
    })
  },
  tab3Btn() {
    this.setData({
      'showTab.tab3': true,
      'showTab.tab2': false,
      'showTab.tab1': false
    })
  },
})