// pages/components/searchbar2/searchbar2.js
/**
 *   我的报修、我的维修、我的结束 专用
 */
var app = getApp();
var tool = require('../../tools/tool.js');
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    myShow: {
      type: Boolean
    },
    WCall: {
      type: String
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    val: '',
    inputErr: false,
    navH: '',
    formdata: {
      date1:"0000-00-00",
      date2:"0000-00-00",
      status:{
        show:{
          submit: false,
          fixing: false,
          fixend: false
        },
        // 值
        submit: true,
        fixing: true,
        fixend: true
      },
      searchVal:""
    }
  },
  ready() {
    console.log(this.data.WCall);
    // 1、设置状态选择的显示值
    if (this.data.WCall == 'mySubmit'){
      this.setData({
        'formdata.status.show.submit': true,
        'formdata.status.show.fixing': true,
        'formdata.status.show.fixend': true,
      })
    }
   else if (this.data.WCall == 'myFxing'){
     console.log("myFxing");
      this.setData({
        'formdata.status.show.submit': false,
        'formdata.status.show.fixing': true,
        'formdata.status.show.fixend': true,
      })
    }
    
    this.setData({
      navH: app.globa.navH
    });
  },

  /**
   * 组件的方法列表
   */
  methods: {
    
    closeMenu() {
      console.log('close');
      this.setData({
        myShow: false
      });
    },
    bindDateChange1(e){
      this.setData({
        'formdata.date1': e.detail.value
      })
      console.log(e.detail.value);
    },
    bindDateChange2(e){
      this.setData({
        'formdata.date2': e.detail.value
      })
      console.log(e.detail.value);
    },
    btn1(){
      this.data.formdata.status.submit ? this.setData({ 'formdata.status.submit': false }) : this.setData({ 'formdata.status.submit': true })
    },
    btn2(){
      this.data.formdata.status.fixing ? this.setData({ 'formdata.status.fixing': false }) : this.setData({ 'formdata.status.fixing': true })
    },
    btn3(){
      this.data.formdata.status.fixend ? this.setData({ 'formdata.status.fixend': false }) : this.setData({ 'formdata.status.fixend': true })
    },
    inputWatch1(e){
      var tmp = e.detail;
      console.log(e);
      this.setData({
        'formdata.searchVal':tmp
      })
    },
    // 确认提交
    btn(e){
      // console.log(e.detail.value.val);
      // 设置关键字
      this.setData({
        'formdata.searchVal': e.detail.value.val
      })
      console.log(this.data.WCall);
      this.triggerEvent("searchReq", this.data.formdata);
      this.closeMenu();
    },
    reset(){
      this.setData({
        'formdata.date1': "0000-00-00",
        'formdata.date2': "0000-00-00",
        'formdata.status.submit': true,
        'formdata.status.fixing': true,
        'formdata.status.fixend': true,
      });
    },
  }
})
