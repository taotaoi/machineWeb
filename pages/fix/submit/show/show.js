// pages/fix/submit/show/show.js
var tool = require('../../../tools/tool.js');
var axSu = require('../../../ax/fix/submit.js');
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
      // this.init(this.data.fixid);
    },
    init(fixid){
      var that = this;
      var fordata = {fixid:fixid};
      wx.showLoading({
        title: 'waiting',
      });
      axSu.getByFixId(fordata).then(function(data){
        console.log(data);
        wx.hideLoading();
        if(tool.chkRes(data)) return;

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
