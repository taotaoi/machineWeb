// pages/fix/fixing/insert/insert.js
var tool = require('../../../tools/tool.js');
var axFixing = require('../../../ax/fix/fixing.js');
var axSubmit = require('../../../ax/fix/submit.js');
var axMa = require('../../../ax/machine/machine.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    fixid:'',
    user: {},
    ma: {
      id: ""
    },
    submit:{},
    showTab: {
      tab1: true,
      tab2: false,
      tab3: false
    },
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (e) {
    if(tool.isNull(e.id)){
      tool.msg("ERR","id is empty");
      return;
    }
    this.setData({
      fixid:e.id
    })
    console.log(this.data.fixid);
    this.init();
  },
  init(){
    // 1、获取用户信息
    if(!tool.isLogin()) return;
    this.setData({
      user:getApp().globalData.user
    });
    console.log(getApp().globalData.user);
    var that = this;
    // 2、获取报修信息
    wx.showLoading({
      title: 'waiting',
    })
    axSubmit.getByFixId(this.data.fixid).then(function(data){
      console.log(data);
      if(tool.chkRes(data)) {
        wx.hideLoading();
        return;
      }
      that.setData({
        submit:data.data.data[0]
      }); 
      return axMa.getByMaId(that.data.submit.machineid);
    }).then(function(data){
      // 3、获取machine信息
      console.log(data);
      wx.hideLoading();
      if (tool.chkRes(data)) return;
      that.setData({
        ma:data.data.data[0]
      })
    });

    
  },
  btn(e){
    console.log(e.detail.value);
    var tmp = e.detail.value;
    if (tool.isNull(tmp.fixuser)) {
      tool.msg("ERR", "fixuser 为空");
      return;
    }
    if (tool.isNull(tmp.whofix)) {
      tool.msg("ERR", "whofix 为空");
      return;
    }

    var that = this;
    wx.showLoading({
      title: 'waiting',
    })
    axFixing.insert(tmp).then(function (data) {
      console.log(data);
      wx.hideLoading();
      if (tool.chkRes(data)) return;
      if (data.data.data) {
        tool.msgRout1("OK", data.data.callback.msg, "../../../main/main");
      }
      
    });

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