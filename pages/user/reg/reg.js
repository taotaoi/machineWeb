// pages/user/reg/reg.js
var tool = require('../../tools/tool.js');
var axUser = require('../../ax/user/user.js');
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
    openid:''
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
      wx.showLoading({
        title: 'waiting',
      });
      if (tool.isNull(getApp().globalData.openid)){
        axUser.getOpenId().then(function (data) {
          wx.hideLoading();
          console.log(data);
          if (tool.chkRes(data)) return;
          getApp().globalData.openid = data.data.data.openid;
          that.setData({
            openid: getApp().globalData.openid
          })
        })
      }
      else {
        that.setData({
          openid: getApp().globalData.openid
        })
      }

    },
    btn(e){
      var fordata = e.detail.value;
      if (tool.isNull(fordata.openid)) {
        tool.msg("ERR", "openid is NULL");
        return;
      }
      if (tool.isNull(fordata.name)) {
        tool.msg("ERR", "name is NULL");
        return;
      }
      if (tool.isNull(fordata.department)) {
        tool.msg("ERR", "department is NULL");
        return;
      }
      console.log(fordata);
      var that = this;
      wx.showLoading({
        title: 'waiting',
      });
      axUser.reg(fordata).then(function(data){
        console.log(data);
        wx.hideLoading();
        if(tool.chkRes(data)) return;
        if(data.data.data){
          tool.msgRout1("OK",data.data.callback.msg,"../show/show");
        }else {
          tool.msg("ERR",data.data.callback.msg);
        }
      });
    },
  }
})
