// pages/fix/submit/show/show.js
var tool = require('../../../tools/tool.js');
var axSu = require('../../../ax/fix/submit.js');
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
    submit:{},
    showTab: {
      tab1: true,
      tab2: false
    },
    status:{
      submit:false,
      fixing:false,
      fixend:false
    },
    ma:{machineid:''}
  },

  /**
   * 组件的方法列表
   */
  methods: {
    onLoad(par){
      this.setData({
        fixid:par.id
      });
      // console.log(par.id);
      this.init(this.data.fixid);
    },
    init(fixid){
      var that = this;
      
      wx.showLoading({
        title: 'waiting',
      });
      axSu.getByFixId(fixid).then(function(data){
        console.log(data);
        
        if(tool.chkRes(data)) return;
        that.setData({
          submit:data.data.data[0]
        });
        // 设置 tab2 machine资料
        return axMa.getByMaId(data.data.data[0].machineid);
      }).then(function(data){
        console.log(data);
        if (tool.chkRes(data)) return;
        wx.hideLoading();
        that.setData({
          ma: data.data.data[0]
        });
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
  }
})
