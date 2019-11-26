// pages/fix/fixing/myList/myList.js
/**
 * 我的维修：当前用户id提交的fix list，包括后续进入fixend的list
 */
var tool = require('../../../tools/tool.js');
var axFixing = require('../../../ax/fix/fixing.js');
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
    var tmp = [];
    axFixing.getByFixUser(this.data.user.id).then(function (data) {
      console.log(data);
     
      if (tool.chkRes(data)) return;
      tmp = tmp.concat(data.data.data);
      return axFixEnd.getByFixUser(that.data.user.id);
      // 拼接当前用户id提交的维修，已经进入fixend状态的list
    }).then(function(data){
      console.log(data);
      wx.hideLoading();
      if (tool.chkRes(data)) return;
      if(data.data.data.length>0){
        tmp = tmp.concat(data.data.data);
      }
      that.setData({
        list: tmp
      })
      console.log(tmp);
    })
  },
  linkToShow(e){
    var obj = e.currentTarget.dataset.data;
    // console.log(fixid);
    if(obj.status == "维修中"){
      tool.route("../show/show?id=" + obj.fixid);
    }
    if (obj.status == "已结束"){
      tool.route("../../fixend/show/show?id=" + obj.fixid);
    }
   
  },
})