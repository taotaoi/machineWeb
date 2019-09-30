// pages/user/login/login.js
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
      // 1、检查是否已经注册过
      wx.showLoading({
        title: 'waiting',
      })
      axUser.getOpenId().then(function(data){
        console.log(data);
        
        if(tool.chkRes(data)) {
          wx.hideLoading();
          return;
          }
        
        return axUser.getUserByOpenId({openid:data.data.data.openid});
      }).then(function(data){
        console.log(data);
        wx.hideLoading();
        if (tool.chkRes(data)) {
          wx.hideLoading();
          return;
        }
        if (data.data.data.length>0){
          // 3、已注册跳转
          getApp().globalData.user = data.data.data[0];
          wx.reLaunch({
            url: "../../main/main",
          });
        }
        else {
          // 2、未注册跳转
          wx.reLaunch({
            url: "../reg/reg",
          });
        }
       
       
      })
     
    

     

      
    }
  }
})
