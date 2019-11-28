function isLogin(){
  var user = getApp().globalData.user;
  if (isNull(user)) {
    wx.reLaunch({
      url: '/pages/user/login/login',
    })
    return false;
  }
  else{
   return true;
  }
}

function isNull(str) {
  try {
    if (str === '' || str === null || str === undefined) {
      return true;
    } else {
      return false;
    }
  } catch (e) {
    return true;
  }

}
function route(url) {
  wx.navigateTo({
    url: url,
  });
}
function routMsg(title, val, url) {
  wx.showModal({
    title: title,
    content: val,
    success: function (res) {
      if (res.confirm) {
        console.log('用户点击确定');
        wx.navigateTo({
          url: url,
        });
      }
      else if (res.cancel) {
        console.log('用户点击取消');
      }
    }
  });
}

function msg(title, val) {
  wx.showModal({
    title: title,
    content: val,
    showCancel: false,
    success: function (res) {
      if (res.confirm) {
        console.log('用户点击确定')
      }
    }
  })
}

// 只有一个按钮的route
function msgRout1(title, val, url) {
  wx.showModal({
    title: title,
    content: val,
    showCancel: false,
    success: function (res) {
      if (res.confirm) {
        console.log('用户点击确定');
        wx.reLaunch({
          url: url,
        });
      }
    }
  })
}

function msgLinkToBar(title, val, url) {
  wx.showModal({
    title: title,
    content: val,
    showCancel: false,
    success: function (res) {
      if (res.confirm) {
        console.log('用户点击确定');
        wx.reLaunch({
          url: url,
        });
      }
    }
  })
}

function chkRes(obj) {
  try {
    if (obj.data.callback.status != 'OK') {
      msg(obj.data.callback.status, obj.data.callback.msg);
      console.log(obj);
      return true;
    } else {
      return false;
    }
  } catch (e) {
    console.log(obj);
    msg('ERR', '检查后端callback：' + JSON.stringify(e));
    return true;
  }
}
function dateMin(date1, date2) {
  var oDate1 = new Date(date1);
  var oDate2 = new Date(date2);
  if (oDate1.getTime() < oDate2.getTime()) {
    // console.log('第一个小');
    return false;
  } else {
    // console.log('第二个小');
    return true;
  }
}
function dateMax(date1, date2) {
  var oDate1 = new Date(date1);
  var oDate2 = new Date(date2);
  if (oDate1.getTime() > oDate2.getTime()) {
    // console.log('第一个大');
    return false;
  } else {
    // console.log('第二个大');
    return true;
  }
}
// 日期格式化返回年月日，去掉时间
function getDate(da){
  da = new Date(da);
  var year = da.getFullYear();
  var month = da.getMonth() + 1;
  var date = da.getDate();
  return ([year, month, date].join('-'));
}

function ax(main, data, url) {
  var p = new Promise(function (req, rej) {
    wx.request({
      url: 'https://taox.top/ma/act/' + url,
      method: 'POST',
      data: {
        main: main,  // 已经自动转换成formdata
        data: JSON.stringify(data)
      },
      header: {
        // 'content-type': 'application/json' // 默认值
        'Content-Type': "application/x-www-form-urlencoded"
      },
      success(res) {
        req(res);
      },
      fail(err) {
        rej(err);
      }
    });
  });
  return p;
}
exports.isNull = isNull;
exports.routMsg = routMsg;
exports.msg = msg;
exports.route = route;
exports.chkRes = chkRes;
exports.ax = ax;
exports.msgRout1 = msgRout1;
exports.msgLinkToBar = msgLinkToBar;
exports.isLogin = isLogin;
exports.dateMax = dateMax;
exports.dateMin = dateMin;
exports.getDate = getDate;