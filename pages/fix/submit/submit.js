// pages/fix/submit/submit.js
var tool = require('../../tools/tool.js');
var axMa = require('../../ax/machine/machine.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    searchBar: false,
    inputTmp:[], // 筛选后的 list
    maList:[],
    machine: {
      id: ""
    },
    showTab: {
      tab1: true,
      tab2: false,
      tab3: false
    },
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {

  },
  maIdWatch(e){
    console.log("chk in");
    var seaVal = e.detail.value;
    if (seaVal != this.data.inputTmp){
      this.setData({
        searchBar: true
      })
      
      // 1、查询所有list
      var that = this;
      var tmp = [];
      this.setData({
        maList:[]
      });
      if(this.data.maList.length>0){
        for (let i = 0; i < this.data.maList.length; i++) {
          let flagName = (this.data.maList[i].name).indexOf(seaVal);
          let flagMaId = (this.data.maList[i].machineid).indexOf(seaVal);
          if (flagName != -1) {
            tmp.push(this.data.maList[i]);
          }
          else if (flagMaId != -1) {
            tmp.push(this.data.maList[i]);
          }
        }
        console.log(tmp);
        that.setData({
          inputTmp: tmp
        })
      }
      else {
        axMa.getAllList().then(function (data) {
          if (tool.chkRes(data)) return;
          that.setData({
            maList: data.data.data
          })
          return (data.data.data);
        }).then(function (data) {
          // 2、便利list

          for (let i = 0; i < data.length; i++) {
            let flagName = (data[i].name).indexOf(seaVal);
            let flagMaId = (data[i].machineid).indexOf(seaVal);
            if (flagName != -1) {
              tmp.push(data[i]);
            }
            else if (flagMaId != -1) {
              tmp.push(data[i]);
            }
          }
          console.log(tmp);
          that.setData({
            inputTmp: tmp
          })
        })
      }

      
      
      // str.indexof(""); -1  = arrtmp


    }
    return;
    
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  tab1Btn() {
    this.setData({
      'showTab.tab1': true,
      'showTab.tab2': false,
    })
  },
  tab2Btn() {
    if (!tool.isNull(this.data.machine.machineid)) {
      this.setData({
        'showTab.tab2': true,
        'showTab.tab1': false,
      })
    }

  },

  btn(e) {
    console.log(e.detail.value);
  }
})