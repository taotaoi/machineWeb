// pages/machine/list/list.js
var axMa = require('../../ax/machine/machine.js');
var tool = require('../../tools/tool.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    tmpMa:[],
    machineList:[],
    count: 0,
    show: false,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log("op");
    this.init();
  },
  init(){
    var that = this;
    wx.showLoading({
      title: 'waiting',
    })
    axMa.getAllList().then(function(data){
      wx.hideLoading();
      console.log(data);
      that.setData({
        tmpMa: data.data.data,
        machineList: data.data.data
      });
    });
  },
  linkToMa(par){
    var id = par.currentTarget.dataset.data;
    wx.navigateTo({   //该调整会在目标页面生成返回的箭头图标
      url: '../show/show?id=' + id,
    })
  },
  showMenu() {
    this.setData({
      show: true
    })
  },
  selectReq(e) {
    this.searchX(e.detail);
  },
  searchX(x) {
    var arr = this.data.tmpMa;
    if (arr.length < 1) return;
    console.log(x);
    var arrTmp = [];
    for (let i = 0; i < arr.length; i++) {
      /**
       *   1、查询machineid
       *   2、查询姓名、部门、位置、CPU、内存、硬盘、显卡、
       */
      var str = (arr[i].name);
      if (!tool.isNull(str)) {
        if (str.indexOf(x) != -1) {
          arrTmp.push(arr[i]);
        }
      }

      var str = (arr[i].department);
      if (!tool.isNull(str)) {
        if (str.indexOf(x) != -1) {
          arrTmp.push(arr[i]);
        }
      }

      var str = (arr[i].machineid);
      if (!tool.isNull(str)) {
        if (str.indexOf(x) != -1) {
          arrTmp.push(arr[i]);
        }
      }

      var str = (arr[i].installaddr);
      if (!tool.isNull(str)) {
        if (str.indexOf(x) != -1) {
          arrTmp.push(arr[i]);
        }
      }
    }
    console.log(arrTmp);
    this.setData({
      machineList: arrTmp
    })
  },
})