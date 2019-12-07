// pages/fix/fixend/insert/insert.js
var tool = require('../../../tools/tool.js');
var axFixing = require('../../../ax/fix/fixing.js');
var axSubmit = require('../../../ax/fix/submit.js');
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
    submit: {},
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
      fixid: par.id,
      user: getApp().globalData.user
    });
    this.init();
  },
  init() {
    var that = this;
    // 1、获取fixing信息
    wx.showLoading({
      title: 'waiting',
    })
    axFixing.getByFixId(this.data.fixid).then(function (data) {
      console.log(data);
      if (tool.chkRes(data)) {
        wx.hideLoading();
        return;
      }
      that.setData({
        fixing: data.data.data[0]
      });
      return axMa.getByMaId(that.data.fixing.machineid);
    }).then(function (data) {
      // 2、获取machine 信息
      wx.hideLoading();
      if (tool.chkRes(data)) return;
      that.setData({
        ma: data.data.data[0]
      })
    });

  },
  btn(e){
    console.log(e.detail.value);
  
    var tmp = e.detail.value;
    if (tool.isNull(tmp.fixid)) {
      tool.msg("ERR", "fixid 为空");
      return;
    }
    if (tool.isNull(tmp.usedtime)) {
      tool.msg("ERR", "usedtime 为空");
      return;
    }
    if (tool.isNull(tmp.fixabout)) {
      tool.msg("ERR", "describe 为空");
      return;
    }
    if (tool.isNull(tmp.cost)) {
      tool.msg("ERR", "describe 为空");
      return;
    }
    if (tool.isNull(tmp.fixenduser)) {
      tool.msg("ERR", "describe 为空");
      return;
    }
    var that = this;
    wx.showLoading({
      title: 'waiting',
    })
    axFixEnd.insert(tmp).then(function(data){
      wx.hideLoading();
      console.log(data);
      if(tool.chkRes(data)) return;
      if (data.data.data) {
        tool.msgRout1("OK", data.data.callback.msg, "../../../main/main");
      }
    })
  },
  tab1Btn() {
    this.setData({
      'showTab.tab1': true,
      'showTab.tab2': false,
      'showTab.tab3': false,
    })
  },
  tab2Btn() {
    this.setData({
      'showTab.tab2': true,
      'showTab.tab1': false,
      'showTab.tab3': false,
    })
  },
  tab3Btn() {
    if (!tool.isNull(this.data.ma.machineid)) {
      this.setData({
        'showTab.tab3': true,
        'showTab.tab2': false,
        'showTab.tab1': false,
      })
    }
  },

  
})