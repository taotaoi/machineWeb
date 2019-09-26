// pages/fix/submit/show/show.js
var tool = require('../../../tools/tool.js');
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
    showTab: {
      tab1: true,
      tab2: false
    },
    ma:{machineid:'2'}
  },

  /**
   * 组件的方法列表
   */
  methods: {
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
  }
})
