// pages/fix/fixend/fixingList/fixingList.js
var axFixing = require('../../../ax/fix/fixing.js');
// var axFixEnd = require('../../../ax/fix/fixend.js');
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
    list: []
  },

  /**
   * 组件的方法列表
   */
  methods: {
    onLoad(){
      this.init();
    },
    init() {
      var that = this;
      wx.showLoading({
        title: 'waiting',
      })
      // 不是查询已经结束的列表，是查询待处理为结束，所以为fixing
      axFixing.getAllList().then(function (data) {
        wx.hideLoading();
        if (tool.chkRes(data)) return;
        console.log(data);
        that.setData({
          list: data.data.data
        });
      });
    },
    linkToFixEnd(par) {
      var fixid = par.currentTarget.dataset.data;
      // console.log(fixid);
      tool.route("../insert/insert?id=" + fixid);
    },
  }
})
