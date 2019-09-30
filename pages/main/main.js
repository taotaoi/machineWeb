// pages/main/main.js
var tool = require('../tools/tool.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    h: 0,
    w: 0,
    setW: 0,
    login: false,
    user:{}
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
    this.init();
  },

  init(){
    // 1、检查登陆情况
    var user = getApp().globalData.user;
    if(tool.isNull(user)){
      wx.reLaunch({
        url: "/pages/user/login/login",
      });
    }
    else {
      this.setData({
        user:user
      })
    }
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
      case 'mySubmitList':{
        wx.navigateTo({
          url: '../fix/submit/myList/myList',
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
      case 'fixingAdd':{
        wx.navigateTo({
          url: '../fix/fixing/insert/insert',
        })
        break;
      }
      case 'myFixing': {
        wx.navigateTo({
          url: '../fix/fixing/myList/myList',
        })
        break;
      } 
      case 'fixingList': {
        wx.navigateTo({
          url: '../fix/fixing/list/list',
        })
        break;
      }
      // 4、fixend
      case 'fixEndAdd': {
        wx.navigateTo({
          url: '../fix/fixend/insert/insert',
        })
        break;
      }
      case 'myFixEndList': {
        wx.navigateTo({
          url: '../fix/fixend/myList/myList',
        })
        break;
      } 
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