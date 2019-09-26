// pages/fix/submit/submit.js
var tool = require('../../../tools/tool.js');
var axMa = require('../../../ax/machine/machine.js');
var axFix = require('../../../ax/fix/submit.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    seaVal:'',
    searchBar: false,
    inputTmp:[], // 筛选后的 list
    maList:[],
    ma: {
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
        this.setData({
          maList: []
        });
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


  tab1Btn() {
    this.setData({
      'showTab.tab1': true,
      'showTab.tab2': false,
    })
  },
  tab2Btn() {
    if (!tool.isNull(this.data.ma.machineid)) {
      this.setData({
        'showTab.tab2': true,
        'showTab.tab1': false,
      })
    }

  },

  btn(e) {
    console.log(e.detail.value);
    var tmp = e.detail.value;
    if(tool.isNull(tmp.machineid)){
      tool.msg("ERR","sid 为空");
      return;
    }
    if (tool.isNull(tmp.fixtype)) {
      tool.msg("ERR","fixtype 为空");
      return;
    }
    if (tool.isNull(tmp.submitabout)) {
      tool.msg("ERR","describe 为空");
      return;
    }
    var that = this;
    axFix.submitAdd(tmp).then(function(data){
      if(tool.chkRes(data)) return;
      if(data.data.data){
        tool.msgRout1("OK",data.data.callback.msg,"../../main/main");
      }
      console.log(data);
    });

  },
  // 组件返回的machineid
  comReq(e){
    var par = e.detail;
    for(let i=0;i<this.data.maList.length;i++){
      if(this.data.maList[i].machineid == par){
        this.setData({
          ma: this.data.maList[i]
        });
      }
    }
  },
})