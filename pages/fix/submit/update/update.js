// pages/fix/submit/update/update.js
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
    fixid:''
  },

  /**
   * 组件的方法列表
   */
  methods: {
    onLoad(par) {
      console.log(par.id);
      this.setData({
        fixid: par.id
      })
    },
    init(){

    },
  }
})
