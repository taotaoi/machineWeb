// pages/fix/submit/myList/myList.js
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
    list:[],
    user: {}
  },

  /**
   * 组件的方法列表
   */
  methods: {
    onLoad(){
      
      this.init();
    },
    init(){
      var that = this;
      if(!tool.isLogin()) return;
      this.setData({
        user: getApp().globalData.user
      })
      console.log(this.data.user);
      wx.showLoading({
        title: 'waiting',
      });
      axSubmit.getByUserId(this.data.user.id).then(function(data){
        console.log(data);
        wx.hideLoading();
        if(tool.chkRes(data)) return;
        that.setData({
          list:data.data.data
        })
      });
    },
    linkToShow(par) {
      var fixid = par.currentTarget.dataset.data;
      // console.log(fixid);
      tool.route("../show/show?id=" + fixid);
    },
  }
})
