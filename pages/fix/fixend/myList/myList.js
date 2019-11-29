// pages/fix/fixend/myList/myList.js
/**
 * 我提交的结束：当前登陆id提交的fixend。
 */
var tool = require('../../../tools/tool.js');
var axFixEnd = require('../../../ax/fix/fixend.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    list: [],
    tmp: [],
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
    console.log(this.data.user);
    wx.showLoading({
      title: 'waiting',
    });
    axFixEnd.getByFixEndUser(this.data.user.id).then(function (data) {
      console.log(data);
      wx.hideLoading();
      if (tool.chkRes(data)) return;
      that.setData({
        list: data.data.data
      })
    });
  },
  linkToShow(e) {
    var fixid = e.currentTarget.dataset.data;
    // console.log(fixid);
    tool.route("../show/show?id=" + fixid);
  },
  searchReq(e) {
    var tmp = e.detail;
    console.log(tmp);
    this.setData({ list: [] })

    // 1、日期筛选
    if (tmp.date1 != "0000-00-00" && tmp.date2 != "0000-00-00") {
      console.log("select date on");
      var tmpArr = [];
      for (let e of this.data.tmp) {
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
    // 2、关键字筛选

  },
  showMenu() {
    this.setData({
      searchShow: true
    })
  },
})