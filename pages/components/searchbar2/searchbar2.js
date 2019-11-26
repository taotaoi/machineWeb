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
        submit: true,
        fixing: true,
        fixend: true
      }
    }
  },
  ready() {
    var that = this;
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
    btn(e){

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
