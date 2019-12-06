// pages/fix/fixend/show/show.js
var tool = require('../../../tools/tool.js');
var axFixEnd = require('../../../ax/fix/fixend.js');
var axMa = require('../../../ax/machine/machine.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    fixid: '',
    user: {},
    ma: {
      id: ""
    },
    fixEnd: {},
    showTab: {
      tab1: true,
      tab2: false,
      tab3: false
    },
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (par) {
    if (tool.isNull(par.id)) {
      tool.msg("ERR", "param id is empty");
      return;
    }
    this.setData({
      fixid: par.id
    });
    this.init();
  },
  init() {
    var that = this;
    // 1、获取fixing信息
    wx.showLoading({
      title: 'waiting',
    })
    axFixEnd.getByFixId(this.data.fixid).then(function (data) {
      console.log(data);
      if (tool.chkRes(data)) {
        wx.hideLoading();
        return;
      }
      that.setData({
        fixEnd: data.data.data[0]
      });
      return axMa.getByMaId(that.data.fixEnd.machineid);
    }).then(function (data) {
      // 2、获取machine 信息
      wx.hideLoading();
      if (tool.chkRes(data)) return;
      that.setData({
        ma: data.data.data[0]
      })
    });

  },
  tab1Btn() {
    this.setData({
      'showTab.tab1': true,
      'showTab.tab2': false,
    })
  },
  tab2Btn() {
    if (!tool.isNull(this.data.ma.machineid)) {
      this.setData({
        'showTab.tab2': true,
        'showTab.tab1': false,
      })
    }
  },
  del() {
    console.log("del:" + this.data.fixid);
  },
  update() {
    console.log("update:" + this.data.fixid);
  }
})