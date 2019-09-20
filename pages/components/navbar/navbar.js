// pages/components/navbar/navbar.js
var app = getApp();
Component({
  /**
   * 组件的属性列表
   */
  options: {
    addGlobalClass: true,
  },
  properties: {
    pageName: String,
    showNav: {
      type: Boolean,
      value: true
    },
    showHome: {
      type: Boolean,
      value: true
    }
  },
  /**
   * 组件的初始数据
   */
  data: {
    navH: ''
  },

  /**
   * 组件的方法列表
   */
  ready() {
    var that = this;
    this.setData({
      navH: app.globa.navH
    });
  },
  methods: {
    //回退
    navBack: function () {
      wx.navigateBack({
        delta: 1
      })
    },
    //回主页
    toIndex: function () {
      wx.reLaunch({
        url: '/pages/main/main',
      })
    },
  }
})
