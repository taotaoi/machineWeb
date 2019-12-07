// pages/fix/fixing/update/update.js
var tool = require('../../../tools/tool.js');
var axFixing = require('../../../ax/fix/fixing.js');
var axSubmit = require('../../../ax/fix/submit.js');
var axMa = require('../../../ax/machine/machine.js');
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
    fixid: '',
    user: {},
    ma: {},
    req: {},
    showTab: {
      tab1: true,
      tab2: false,
      tab3: false
    },
  },

  /**
   * 组件的方法列表
   */
  methods: {
    onLoad(e){
      if (tool.isNull(e.id)) {
        tool.msg("ERR", "id is empty");
        return;
      }
      this.setData({
        fixid: e.id,
        user: getApp().globalData.user
      })
      console.log(this.data.fixid);
      this.init(e.id);
    },
    init(fixid){
      var that = this;
      wx.showLoading({
        title: 'waiting',
      });
      
      axFixing.getByFixId(fixid).then(function (data) {
        console.log(data);
        if (tool.chkRes(data)) return;
        that.setData({
          'req': data.data.data[0]
        });
        return axMa.getByMaId(data.data.data[0].machineid);
      })
        .then(function (data) {
          console.log(data);
          if (tool.chkRes(data)) return;
          wx.hideLoading();
          that.setData({
            ma: data.data.data[0]
          });
        })
    },
    tab1Btn() {
      this.setData({
        'showTab.tab1': true,
        'showTab.tab2': false,
        'showTab.tab3': false,
      })
    },
    tab2Btn() {
      this.setData({
        'showTab.tab2': true,
        'showTab.tab1': false,
        'showTab.tab3': false,
      })
    },
    tab3Btn() {
      if (!tool.isNull(this.data.ma.machineid)) {
        this.setData({
          'showTab.tab3': true,
          'showTab.tab2': false,
          'showTab.tab1': false,
        })
      }
    },
    btn(e) {
      console.log(e.detail.value);
      var data = e.detail.value;
      if (tool.isNull(data.whofix)) {
        tool.msg("ERR", "whofix 为空");
        return;
      }
      if (tool.isNull(data.fixid)) {
        tool.msg("ERR", "fixid 为空");
        return;
      }
      if (tool.isNull(data.fixuser)) {
        tool.msg("ERR", "fixuser id 为空");
        return;
      }

    
    },
  }
})
