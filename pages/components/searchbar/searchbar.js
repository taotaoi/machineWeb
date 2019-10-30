// pages/components/searchbar/searchbar.js
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
    myWho:{
      type: String
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    val:'',
    inputErr: false,
    navH: ''
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
    onLoad(){
      
    },
    closeMenu() {
      console.log('close');
      this.setData({
        myShow: false
      });
    },
    btn(e) {
      // console.log(e.detail.value);
      var tmp = e.detail.value;
      if (tool.isNull(tmp.val)) {
        this.setData({
          inputErr: true
        })
        return;
      }
      console.log(this.data.myWho);
  
      if (this.data.myWho=="print"){
        // print list 回传fun
        this.triggerEvent("selectPrintReq", tmp.val);
        console.log("selectPrintReq");
      }else{
        this.triggerEvent("selectReq", tmp.val);
        console.log("selectReq");
      }
     
      this.setData({
        myShow: false,
      })

    },
    inputWatch(e) {
      var tmp = e.detail;
      // console.log(tmp);
      this.setData({
        inputErr: false
      })
    },
  },

})