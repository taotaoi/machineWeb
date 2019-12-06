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

    // 2、日期筛选(只筛选fixday)
    if (tmp.date1 != "0000-00-00" && tmp.date2 != "0000-00-00") {
      console.log("select date on");
      var tmpArr = [];
      var t1 = tmp.date1.substring(0, 10);
      var t2 = tmp.date2.substring(0, 10);
      for (let e of this.data.list) {
        // 起始日期与e相同 或 结束日期与e相同
        var d1 = e.fixday.substring(0, 10);
        console.log(t1);
        console.log(d1);
        if ((d1 == t1) || (d1 == t2)) {
          tmpArr.push(e);
        }
        // 如果有在范围内的e push
        else if (tool.dateMax(tmp.date1, e.fixday) && tool.dateMin(tmp.date2, e.fixday)) {
          // console.log(e);
          tmpArr.push(e);
        }
      }
      this.setData({ list: tmpArr })
    }

    // 3、关键字筛选
    // 提交人姓名？维修人姓名？结束人姓名，设备名称，设备型号、故障类型
    else if (!tool.isNull(tmp.searchVal)) {
      console.log("关键字on");
      let tmpArr = [];
      for (let e of this.data.list) {
        console.log(e);
        // 过滤设备名称，设备型号、故障类型
        if (!tool.isNull(e.name) ? e.name.indexOf(tmp.searchVal) != -1 : false) {
          tmpArr.push(e);
        }
        if (!tool.isNull(e.machineid) ? e.machineid.indexOf(tmp.searchVal) != -1 : false) {
          tmpArr.push(e);
        }
        // 过滤设备型号
        else if (!tool.isNull(e.model) ? e.model.indexOf(tmp.searchVal) != -1 : false) {
          tmpArr.push(e);
        }
        // 过滤故障类型
        else if (!tool.isNull(e.fixtype) ? e.fixtype.indexOf(tmp.searchVal) != -1 : false) {
          tmpArr.push(e);
        }
        // 维修状态 过滤报修人，维修人
        if (e.status == '维修中') {
          if (!tool.isNull(e.submitname) ? e.submitname.indexOf(tmp.searchVal) != -1 : false) {
            tmpArr.push(e);
          } else if (!tool.isNull(e.fixingname) ? e.fixingname.indexOf(tmp.searchVal) != -1 : false) {
            tmpArr.push(e);
          }
        }
        // 结束状态 过滤报修人，维修人，结束人
        if (e.status == '已结束') {
          if (!tool.isNull(e.submitname) ? e.submitname.indexOf(tmp.searchVal) != -1 : false) {
            tmpArr.push(e);
          } else if (!tool.isNull(e.fixingname) ? e.fixingname.indexOf(tmp.searchVal) != -1 : false) {
            tmpArr.push(e);
          } else if (!tool.isNull(e.fixendname) ? e.fixendname.indexOf(tmp.searchVal) != -1 : false) {
            tmpArr.push(e);
          }
        }
      }
      this.setData({
        list: tmpArr
      })
      console.log(tmpArr);
    }
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