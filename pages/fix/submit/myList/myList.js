// pages/fix/submit/myList/myList.js
/**
 *  我的报修：当前登陆用户ID提交的submit list、包括后续已进入fix状态list、以及进入fixend状态list
 */
var axSubmit = require('../../../ax/fix/submit.js');
var axFixing = require('../../../ax/fix/fixing.js');
var axFixEnd = require('../../../ax/fix/fixend.js')
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
    res:{
      submit: [],
      fixing:[],
      fixend:[]
    },
    user: {},
    searchShow: false
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
      console.log(this.data.user.id);
      var p1 = axSubmit.getByUserId(this.data.user.id);
      var p2 = axFixing.getBySubmitUser(this.data.user.id);
      var p3 = axFixEnd.getBySubmitUser(this.data.user.id);
      var promiseArr = [p1, p2, p3];
      Promise.all(promiseArr).then(function(res){
        console.log(res);
        wx.hideLoading();
        var tmp = [];
        tmp = (res[0].data.data).concat(res[1].data.data);
        tmp = tmp.concat(res[2].data.data);
        that.setData({
          'res.submit':res[0].data.data,
          'res.fixing': res[1].data.data,
          'res.fixend': res[2].data.data,
          list: tmp
        });

      })

      // axSubmit.getByUserId(this.data.user.id).then(function(data){
      //   console.log(data);
      //   wx.hideLoading();
      //   if(tool.chkRes(data)) return;
      //  
      // });
    },
    linkToShow(par) {
      var fixid = par.currentTarget.dataset.data;
      // console.log(fixid);
      tool.route("../show/show?id=" + fixid);
    },
    showMenu(){
      this.setData({
        searchShow:true
      })
    },
  }
})
