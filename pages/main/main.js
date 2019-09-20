// pages/main/main.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    h: 0,
    w: 0,
    setW: 0,
    login: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      h: wx.getSystemInfoSync().windowHeight,
      w: wx.getSystemInfoSync().windowWidth
    });
    console.log("w:" + this.data.w + " h:" + this.data.h);
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  router(par) {
    var id = par.currentTarget.dataset.data;
    console.log('main Router:' + id);
    switch (id) {
      case 'listMA': {
        wx.navigateTo({
          url: '../machine/list/list',
        })
        break;
      }
      case 'partmentListPC': {
        wx.navigateTo({
          url: '../computer/partmentList2/partmentList2',
        })
        break;
      }
      case 'insertPC': {
        wx.navigateTo({
          url: '../computer/insert/insert',
        })
        break;
      }
      // print
      case 'listPrint': {
        wx.navigateTo({
          url: '../print/list/list',
        })
        break;
      }
      case 'partmentListPrint': {
        wx.navigateTo({
          url: '../print/partmentList/partmentList',
        })
        break;
      }
      case 'insertPrint': {
        wx.navigateTo({
          url: '../print/insert/insert',
        })
        break;
      }
      // 存货
      case 'inventory': {
        wx.navigateTo({
          url: '/pages/inventory/inventory/list/list',
        })
        break;
      }

      case 'insertInv': {
        wx.navigateTo({
          url: '/pages/inventory/inventory/insert/insert',
        })
        break;
      }
      case 'in': {
        wx.navigateTo({
          url: '/pages/inventory/in/insert/insert',
        })
        break;
      }
      case 'out': {
        wx.navigateTo({
          url: '/pages/inventory/out/insert/insert',
        })
        break;
      }
      case 'inoutlist': {
        // wx.navigateTo({
        //   url: '/pages/inventory/sheet/inoutList/inoutList',
        // })
        break;
      }
      case 'resetCount': {
        this.resetCount();
        break;
      }
      default: {
        console.log('route err');
        break;
      }
    }

  },
})