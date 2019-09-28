// pages/demo/main.js
var tool = require('../tools/tool.js');
var axCom = require('../ax/fix/comm.js');
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

  },

  /**
   * 组件的方法列表
   */
  methods: {
    onLoad(){
      this.init();
    },
    init(){
      var formdata = {fixid:'1'};
      axCom.getStatusByFixId(formdata).then(function(data){
        console.log(data);
      });
    }
  }
})
