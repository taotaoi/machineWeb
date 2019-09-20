
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
    success: function (res) {
      if (res.confirm) {
        console.log('用户点击确定')
      }
    }
  })
}

// 只有一个按钮
function msgBtn1(title, val, url) {
  wx.showModal({
    title: title,
    content: val,
    showCancel: false,
    success: function (res) {
      if (res.confirm) {
        console.log('用户点击确定');
        wx.navigateTo({
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
exports.msgBtn1 = msgBtn1;
exports.msgLinkToBar = msgLinkToBar;