// pages/fix/fixing/myList/myList.js
/**
 * 我的维修：当前用户id提交的fix list，包括后续进入fixend的list
 */
var tool = require('../../../tools/tool.js');
var axFixing = require('../../../ax/fix/fixing.js');
var axFixEnd = require('../../../ax/fix/fixend.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    list: [],
    res: {
      fixing: [],
      fixend: []
    },
    user: {},
    searchShow: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.init();
  },
  init() {
    var that = this;
    if (!tool.isLogin()) return;
    this.setData({
      user: getApp().globalData.user
    })

    var tmp = [];
    console.log(this.data.user.id);
    var p1 = axFixing.getBySubmitUser(this.data.user.id);
    var p2 = axFixEnd.getBySubmitUser(this.data.user.id);
    var promiseArr = [p1, p2];
    wx.showLoading({
      title: 'waiting',
    });
    Promise.all(promiseArr).then(function (res) {
      console.log(res);
      wx.hideLoading();
      var tmp = [];
      tmp = (res[0].data.data);
      tmp = tmp.concat(res[1].data.data);
      that.setData({
        'res.fixing': res[0].data.data,
        'res.fixend': res[1].data.data,
        list: tmp
      });
    })
  },
  searchReq(e) {
    var tmp = e.detail;
    console.log(tmp);
    this.setData({ list: [] })
    // 1、状态筛选
    if (tmp.status.fixing) {
      this.setData({ list: this.data.list.concat(this.data.res.fixing) })
    }
    if (tmp.status.fixend) {
      this.setData({ list: this.data.list.concat(this.data.res.fixend) })
    }

    // 2、日期筛选
    if (tmp.date1 != "0000-00-00" && tmp.date2 != "0000-00-00") {
      console.log("select date on");
      var tmpArr = [];
      for (let e of this.data.list) {
        // 起始日期与e相同 或 结束日期与e相同
        var t1 = tmp.date1.substring(0, 10);
        var t2 = tmp.date2.substring(0, 10);
        var d1 = e.submitdatetime.substring(0, 10);
        console.log(tmp.date1.substring(0, 10));
        console.log(e.submitdatetime.substring(0, 10));
        if ((d1 == t1) || (d1 == t2)) {
          tmpArr.push(e);
        }
        // 如果有在范围内的e push
        if (tool.dateMax(tmp.date1, e.submitdatetime) && tool.dateMin(tmp.date2, e.submitdatetime)) {
          // console.log(e);
          tmpArr.push(e);
        }
      }
      this.setData({ list: tmpArr })
    }

    // 3、关键字筛选
  },
  linkToShow(e){
    var obj = e.currentTarget.dataset.data;
    // console.log(fixid);
    if(obj.status == "维修中"){
      tool.route("../show/show?id=" + obj.fixid);
    }
    if (obj.status == "已结束"){
      tool.route("../../fixend/show/show?id=" + obj.fixid);
    }
  },
  showMenu() {
    this.setData({
      searchShow: true
    })
  },
})