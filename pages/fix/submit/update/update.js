// pages/fix/submit/update/update.js
var tool = require('../../../tools/tool.js');
var axSu = require('../../../ax/fix/submit.js');
var axMa = require('../../../ax/machine/machine.js');
var axFix = require('../../../ax/fix/submit.js');
var axFixType = require('../../../ax/fix/fixtype.js');
Component({
  /**
   * 组件的属性列表
   */
  properties: {

  },

  /**
   * 组件的初始数据
   */
  data: {
    user: {},
    fixid:'',
    req: {},
    ma:{},
    fixType:[],
    fixTypeVal:'',
    showTab: {
      tab1: true,
      tab2: false
    },
  },

  /**
   * 组件的方法列表
   */
  methods: {
    onLoad(par) {
      console.log(par.id);
      this.setData({
        fixid: par.id,
        user: getApp().globalData.user
      });
      this.init(par.id);
    
    },
    init(fixid){
      var that = this;
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
        return axFixType.getAllList();
      }).then(function(res){
        if (tool.chkRes(res)) return;
        var tmp = [];
        for (let e of res.data.data) {
          tmp.push(e.name);
        }
        that.setData({
          fixType: tmp
        })
      })
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
    bindPickerChange(e) {
      console.log('pick:', this.data.fixType[e.detail.value]);
      this.setData({
        'req.fixtype': this.data.fixType[e.detail.value]
      });
    },
    btn(e) {
      console.log(e.detail.value);
      var data = e.detail.value;
      if(tool.isNull(data.fixtype)){
        tool.msg("ERR", "fixtype 为空");
        return;
      }
      if (tool.isNull(data.fixid)) {
        tool.msg("ERR", "fixid 为空");
        return;
      }
      if (tool.isNull(data.submituser)) {
        tool.msg("ERR", "submituser 为空");
        return;
      }
      if (tool.isNull(data.submitabout)) {
        tool.msg("ERR", "submitabout 为空");
        return;
      }
      var that = this;
      wx.showLoading({
        title: 'waiting',
      })
      axSu.update(data).then(function(res){
        wx.hideLoading();
        console.log(res);
        if(tool.chkRes(res)) return;
        
      });
    },

  }
})
