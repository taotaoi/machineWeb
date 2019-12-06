// pages/fix/fixing/show/show.js
var tool = require('../../../tools/tool.js');
var axSu = require('../../../ax/fix/submit.js');
var axFixing = require('../../../ax/fix/fixing.js');
var axFixEnd = require('../../../ax/fix/fixend.js');
var axMa = require('../../../ax/machine/machine.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    fixid: '',
    status: '',
    req: {},
    // 控制 三个状态的树形 信息框
    showBox: {
      submit: false,
      fixing: false,
      fixend: false
    },
    user: {},
    ma: {
      id: ""
    },
    fixing: {},
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
    if(tool.isNull(par.id)){
      tool.msg("ERR","param id is empty");
      return;
    }
    this.setData({
      fixid:par.id,
      status: par.status
    });
    this.init(par.id);
  },
  init(fixid){
    var that = this;
    // 报修中
    if (this.data.status == '报修中') {
      this.setData({
        'showBox.submit': true,
        'showBox.fixing': false,
        'showBox.fixend': false,
      });
      wx.showLoading({
        title: 'waiting',
      });
      axSu.getByFixId(fixid).then(function (data) {
        console.log(data);
        if (tool.chkRes(data)) return;
        that.setData({
          req: data.data.data[0]
        });
        // 设置 tab2 machine资料
        return axMa.getByMaId(data.data.data[0].machineid);
      }).then(function (data) {
        console.log(data);
        if (tool.chkRes(data)) return;
        wx.hideLoading();
        that.setData({
          ma: data.data.data[0]
        });
      })
    }
    // 状态 维修中
    else if (this.data.status == '维修中') {
      this.setData({
        'showBox.submit': true,
        'showBox.fixing': true,
        'showBox.fixend': false,
      });
      wx.showLoading({
        title: 'waiting',
      });
      axFixing.getByFixId(fixid).then(function (data) {
        console.log(data);
        if (tool.chkRes(data)) return;
        that.setData({
          'req': data.data.data[0]
        });
        return axMa.getByMaId(data.data.data[0].machineid);
      })
        .then(function (data) {
          console.log(data);
          if (tool.chkRes(data)) return;
          wx.hideLoading();
          that.setData({
            ma: data.data.data[0]
          });
        })
    }
    // 状态 已结束
    else if (this.data.status == '已结束') {
      this.setData({
        'showBox.submit': true,
        'showBox.fixing': true,
        'showBox.fixend': true,
      });
      wx.showLoading({
        title: 'waiting',
      });
      axFixEnd.getByFixId(fixid).then(function (data) {
        console.log(data);

        if (tool.chkRes(data)) return;
        that.setData({
          req: data.data.data[0]
        });
        // 设置 tab2 machine资料
        return axMa.getByMaId(data.data.data[0].machineid);
      }).then(function (data) {
        console.log(data);
        if (tool.chkRes(data)) return;
        wx.hideLoading();
        that.setData({
          ma: data.data.data[0]
        });
      })
    }
    
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