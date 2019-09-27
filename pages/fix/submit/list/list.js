// pages/fix/submit/list/list.js
var axSubmit = require('../../../ax/fix/submit.js');
var tool = require('../../../tools/tool.js');
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
    list:[]
  },

  /**
   * 组件的方法列表
   */
  methods: {
    onLoad() {
      this.init();
    },
    init(){
      var that = this;
      wx.showLoading({
        title: 'waiting',
      });
      axSubmit.getAlllist().then(function(data){
        console.log(data);
        wx.hideLoading();
        if(tool.chkRes(data)) return;
        that.setData({
          list:data.data.data
        })
      });
    },
    linkToShow(par){
      var fixid = par.currentTarget.dataset.data;
      // console.log(fixid);
      tool.route("../show/show?id="+fixid);
    },
  }
})
