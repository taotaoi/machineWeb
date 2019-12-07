// pages/fix/submit/show/show.js

var tool = require('../../../tools/tool.js');
var axSu = require('../../../ax/fix/submit.js');
var axFixing = require('../../../ax/fix/fixing.js');
var axFixEnd = require('../../../ax/fix/fixend.js');
var axMa = require('../../../ax/machine/machine.js');
var axCom = require('../../../ax/fix/comm.js'); // 查询状态
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
    fixid:'',
    status:'',
    req:{},
    showTab: {
      tab1: true,
      tab2: false
    },
    // 控制 三个状态的树形 信息框
    showBox:{
      submit:false,
      fixing:false,
      fixend:false
    },
    // 控制修改、删除的功能显示
    showBar: false,
    ma:{machineid:''}
  },

  /**
   * 组件的方法列表
   */
  methods: {
    onLoad(par){
      this.setData({
        fixid:par.id,
        status:par.status
      });
      // console.log(par.id);
      this.init(this.data.fixid);
    },
    init(fixid){
      var that = this;
      // 报修中
      if(this.data.status == '报修中'){
        this.setData({
          'showBox.submit':true,
          'showBox.fixing': false,
          'showBox.fixend': false,
          showBar: true // 开启删除 修改功能按钮
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
        axFixing.getByFixId(fixid).then(function(data){
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
      // 从list列表link过来，不启用修改功能
      else{
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
      tool.route("../update/update?id=" + this.data.fixid);
    },
  }
})
