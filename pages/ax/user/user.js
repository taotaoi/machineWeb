const url = getApp().globa.URL + 'user.php';

function reg(data) {
  var p = new Promise(function (req, rej) {
    wx.request({
      url: url,
      method: 'post',
      data: {
        main: 'reg',
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

// 获取用户信息
function getUserByOpenId(data){
  var p = new Promise(function (req, rej) {
    wx.request({
      url: url,
      method: 'post',
      data: {
        main: 'getuserbyopenid',
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

// 对外
function getOpenId() {
  var p = new Promise(function (req, rej) {
    getCode().then(function (data) {
      var formdata = { code: data.code };
      return getOpenIdByCode(formdata);
    }).then(function (data) {
      req(data);
    })
  })
  return p;
}

// js文件内部使用
function getCode() {
  var p = new Promise(function (req, rej) {
    wx.login({
      success(res) {
        if (res.code) {
          req(res);
        } else {
          rej(res.errMsg);
          console.log('登录失败！' + res.errMsg)
        }
      }
    })
  });
  return p;
}

// js内部使用
function getOpenIdByCode(data) {
  var p = new Promise(function (req, rej) {
    wx.request({
      url: url,
      method: 'post',
      data: {
        main: 'getopenid',
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

exports.reg = reg;
exports.getOpenId = getOpenId;
exports.getUserByOpenId = getUserByOpenId;