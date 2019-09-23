// pages/components/inputsearch/inputsearch.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    list: {  // 属性值1
      type: Object
    },
    show: {
      type: Boolean
    }
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
    selected(par){
     var id = par.currentTarget.dataset.data;
     console.log(id);
      this.setData({
        show: false
      })
    },
    closeBar(){
     
    }
  }
})
